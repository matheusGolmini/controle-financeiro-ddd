import {
  EmailValueObject,
  PasswordValueObject,
} from '@domain-user/values-objects';
import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository, USER_TOKEN } from '@repo/user.repository.interface';
import Result from '@shared-core/result';
import IUseCase from '@shared-core/use-case.interface';
import { ERROR_MESSAGES } from '@shared/error-messages';
import { JWTPayload } from './jwt.payload.interface';
import { SigninDto } from './signin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SigninUseCase implements IUseCase<SigninDto, Result<JWTPayload>> {
  constructor(
    @Inject(USER_TOKEN)
    private readonly userRepo: IUserRepository,
    @Inject(JwtService)
    private readonly jwtService: JwtService,
  ) {}

  async execute({ email, password }: SigninDto): Promise<Result<JWTPayload>> {
    const emailOrError = EmailValueObject.create(email);
    const passwordOrError = PasswordValueObject.create(password);

    const hasError = Result.combine([emailOrError, passwordOrError]);

    if (hasError.isFailure) {
      return Result.fail<JWTPayload>(hasError.error.toString());
    }

    try {
      const user = await this.userRepo.findOne({ email });

      if (!user || !user.password.comparePasswords(password)) {
        return Result.fail<JWTPayload>(ERROR_MESSAGES.INVALID_CREDENTIALS);
      }

      const token = this.jwtService.sign({ userId: user.id.toString() });

      return Result.ok<JWTPayload>({
        token,
      });
    } catch (error) {
      return Result.fail<JWTPayload>(
        'Internal Server Error on Signin Use Case',
      );
    }
  }
}
