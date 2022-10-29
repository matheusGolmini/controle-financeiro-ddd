import {
  Inject,
  Injectable,
  PreconditionFailedException,
} from '@nestjs/common';
import Result from '@shared-core/result';
import { JWTPayload } from 'application/user/use-cases/signin/jwt.payload.interface';
import { SigninDto } from 'application/user/use-cases/signin/signin.dto';
import { SigninUseCase } from 'application/user/use-cases/signin/signin.use-case';
import { SignupDto } from 'application/user/use-cases/signup/signup.dto';
import { SignUpUseCase } from 'application/user/use-cases/signup/signup.use-case';

@Injectable()
export class UserService {
  constructor(
    @Inject(SignUpUseCase)
    private readonly signUpUseCase: SignUpUseCase,

    @Inject(SigninUseCase)
    private readonly signinUseCase: SigninUseCase,
  ) {}

  private validateResult(result: Result<any>): void {
    if (result.isFailure) {
      throw new PreconditionFailedException(result.error);
    }
  }

  async signup(dto: SignupDto): Promise<void> {
    const result = await this.signUpUseCase.execute(dto);
    this.validateResult(result);
  }

  async signin(dto: SigninDto): Promise<JWTPayload> {
    const result = await this.signinUseCase.execute(dto);
    this.validateResult(result);
    return result.getResult();
  }
}
