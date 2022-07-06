import { IUserRepository } from '@repo/user.repository.interface';
import { SignupDto } from './signup.dto';
import { SignUpUseCase } from './signup.use-case';

describe('signup.use-case', () => {
  let userRepo: IUserRepository;

  beforeEach(() => {
    userRepo = {
      delete: jest.fn(),
      exists: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
    };
  });

  const makeDto = (props: Partial<SignupDto>): SignupDto => {
    return {
      acceptedTerms: props.acceptedTerms ?? true,
      email: props.email ?? 'valid_email@domain.com',
      password: props.password ?? 'valid_password',
      term: {
        acceptedAt: props.term?.acceptedAt ?? new Date(),
        ip: props.term?.ip ?? '123.123.123.123',
        userAgent: {
          name: props.term?.userAgent?.name ?? 'firefox',
          os: props.term?.userAgent?.os ?? 'LINUX',
          type: props.term?.userAgent?.type ?? 'browser',
          version: props.term?.userAgent?.version ?? '86.1',
        },
      },
    };
  };

  it('Should be defined', () => {
    const useCase = new SignUpUseCase(userRepo);
    expect(useCase).toBeDefined();
  });

  it('Should return fails if not accept the terms', async () => {
    const useCase = new SignUpUseCase(userRepo);
    const result = await useCase.execute(makeDto({ acceptedTerms: false }));

    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('Terms must be accepted');
  });

  it('Should fails if user already exists for provided email', async () => {
    jest.spyOn(userRepo, 'exists').mockResolvedValueOnce(true);

    const useCase = new SignUpUseCase(userRepo);
    const result = await useCase.execute(
      makeDto({ email: 'exists_email@doamin.com' }),
    );

    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('User already exist for provided email');
  });

  it('Should save user with success', async () => {
    jest.spyOn(userRepo, 'exists').mockResolvedValueOnce(false);

    const saved = jest.spyOn(userRepo, 'save');
    const useCase = new SignUpUseCase(userRepo);
    const result = await useCase.execute(makeDto({}));

    expect(result.isSuccess).toBe(true);
    expect(saved).toBeCalled();
  });
});
