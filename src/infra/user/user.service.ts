import {
  Inject,
  Injectable,
  PreconditionFailedException,
} from '@nestjs/common';
import { SignupDto } from 'application/user/use-cases/signup/signup.dto';
import { SignUpUseCase } from 'application/user/use-cases/signup/signup.use-case';

@Injectable()
export class UserService {
  constructor(
    @Inject(SignUpUseCase)
    private readonly signUpUseCase: SignUpUseCase,
  ) {}

  async signup(dto: SignupDto): Promise<void> {
    const result = await this.signUpUseCase.execute(dto);
    if (result.isFailure) {
      console.log(result.error);
      throw new PreconditionFailedException(result.error);
    }
  }
}
