import Result from '@shared-core/result';
import IUseCase from '@shared-core/use-case.interface';
import { UserAggregate } from '@domain-user/aggregates';
import {
  EmailValueObject,
  IpValueObject,
  PasswordValueObject,
  TermValueObject,
  DateValueObject,
} from '@domain-user/values-objects';
import { Inject } from '@nestjs/common';
import { IUserRepository, USER_TYPE } from '@repo/user.repository.interface';
import { SignupDto } from './signup.dto';

export class SignUpUseCase implements IUseCase<SignupDto, Result<void>> {
  constructor(@Inject(USER_TYPE) private readonly userRepo: IUserRepository) {}

  async execute({
    email,
    password,
    term,
    acceptedTerms,
  }: SignupDto): Promise<Result<void>> {
    if (!acceptedTerms) {
      return Result.fail<void>('Terms must be accepted');
    }

    const emailOrError = EmailValueObject.create(email);
    const passwordOrError = PasswordValueObject.create(password);

    const ipOrError = IpValueObject.create(term.ip);
    const acceptedAtOrError = DateValueObject.create(term.acceptedAt);

    const hasErrorOnValueObjects = Result.combine([
      emailOrError,
      passwordOrError,
      ipOrError,
      acceptedAtOrError,
    ]);

    if (hasErrorOnValueObjects.isFailure) {
      return Result.fail<void>(hasErrorOnValueObjects.error);
    }

    const termOrError = TermValueObject.create({
      acceptedAt: acceptedAtOrError.getResult(),
      ip: ipOrError.getResult(),
      userAgent: term.userAgent,
    });

    if (termOrError.isFailure) {
      return Result.fail<void>(termOrError.error.toString.toString());
    }

    const pass = passwordOrError.getResult();
    pass.encryptPassword();

    const userOrError = UserAggregate.create({
      email: emailOrError.getResult(),
      password: pass,
      terms: [termOrError.getResult()],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (userOrError.isFailure) {
      return Result.fail<void>(userOrError.error.toString.toString());
    }
    const user = userOrError.getResult();
    try {
      const userAlreadyExistForEmail = await this.userRepo.exists({
        email: user.email.value,
      });
      if (userAlreadyExistForEmail) {
        return Result.fail<void>('User already exist for provided email');
      }

      await this.userRepo.save(user);
      return Result.ok<void>();
    } catch (error) {
      return Result.fail<void>('Internal Server Error on Signup Use Case');
    }
  }
}
