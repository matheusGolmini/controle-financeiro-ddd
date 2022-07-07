import { UserAggregate } from '@domain-user/aggregates';
import {
  EmailValueObject,
  PasswordValueObject,
} from '@domain-user/values-objects';
import { JwtService } from '@nestjs/jwt';
import { IUserRepository } from '@repo/user.repository.interface';
import { ERROR_MESSAGES } from '@shared/error-messages';
import { SigninUseCase } from './signin.use-case';

describe('signin.use-case', () => {
  let userRepo: IUserRepository;
  let user: UserAggregate;
  let fakeJwt: JwtService;
  let useCase: SigninUseCase;

  beforeAll(() => {
    user = UserAggregate.create({
      email: EmailValueObject.create('valid_email@gmail.com').getResult(),
      password: PasswordValueObject.create('valid_password').getResult(),
      terms: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }).getResult();

    fakeJwt = {
      sign: jest.fn(),
    } as unknown as JwtService;
  });

  beforeEach(() => {
    userRepo = {
      delete: jest.fn(),
      exists: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
    };

    useCase = new SigninUseCase(userRepo, fakeJwt);
  });

  it('signin.use-case should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should retrun fail if not provide a valid email', async () => {
    const result = await useCase.execute({
      email: 'invalid_email',
      password: 'valid_password',
    });

    expect(result.isFailure).toBeTruthy();
  });

  it('should retrun fail if not provide a valid password', async () => {
    const result = await useCase.execute({
      email: 'valid_email@gmail.com',
      password: '',
    });

    expect(result.isFailure).toBeTruthy();
  });

  it('should retrun fail if not exist user for provided email', async () => {
    jest.spyOn(userRepo, 'findOne').mockResolvedValueOnce(undefined);

    const result = await useCase.execute({
      email: 'not_exists@domain.com',
      password: 'valid_password',
    });

    expect(result.isFailure).toBeTruthy();
    expect(result.error).toBe(ERROR_MESSAGES.INVALID_CREDENTIALS);
  });

  it('should retrun fail if provided password does not match', async () => {
    jest.spyOn(userRepo, 'findOne').mockResolvedValueOnce(user);

    const result = await useCase.execute({
      email: 'valid_email@gmail.com',
      password: 'not_exists_password',
    });

    expect(result.isFailure).toBeTruthy();
    expect(result.error).toBe(ERROR_MESSAGES.INVALID_CREDENTIALS);
  });

  it('should return fail if there is any error with the database', async () => {
    jest.spyOn(userRepo, 'findOne').mockRejectedValueOnce('Error database');

    const result = await useCase.execute({
      email: 'valid_email@gmail.com',
      password: 'valid_password',
    });

    expect(result.isFailure).toBeTruthy();
  });

  it('should return token payload if provided a valid password', async () => {
    jest.spyOn(userRepo, 'findOne').mockResolvedValueOnce(user);
    jest.spyOn(fakeJwt, 'sign').mockReturnValueOnce('valid_token');

    const result = await useCase.execute({
      email: 'valid_email@gmail.com',
      password: 'valid_password',
    });

    expect(result.isSuccess).toBeTruthy();
    expect(result.getResult().token).toBe('valid_token');
  });
});
