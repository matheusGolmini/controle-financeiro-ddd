import { IUserRepository } from '@repo/user.repository.interface';
import { SignupUseCase } from './signup.use-case';

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

  it('Should be defined', () => {
    const useCase = new SignupUseCase(userRepo);
    expect(useCase).toBeDefined();
  });
});
