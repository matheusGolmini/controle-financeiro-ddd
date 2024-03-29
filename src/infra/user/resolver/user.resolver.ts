import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JWTPayload } from 'application/user/use-cases/signin/jwt.payload.interface';
import { SiginInput } from '../inputs/signin.input';
import { SignupInput } from '../inputs/signup.input';
import { GetUserAgent } from '../services/decorators/get-user-agent.decorator';
import { JwtAuthGuard } from '../services/guards/jwt-auth.guard';
import { JWTPayloadType } from '../types/jwt-payload.type';
import { UserAgentType } from '../types/user-agent.type';
import { UserType } from '../types/user.type';
import { UserService } from '../user.service';

@Resolver(() => UserType)
export class UserResolver {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  @Query(() => [UserType])
  @UseGuards(JwtAuthGuard)
  async users(): Promise<UserType[]> {
    const userType = new UserType();
    userType.email = 'valid_email@domain.com';
    userType.id = 'valid_id';
    userType.terms = [];
    userType.terms.push({
      acceptedAt: new Date(),
      ip: '123.123.123.123',
      userAgent: {
        name: 'firefox',
        os: 'LINUX',
        type: 'broser',
        version: '86.01',
      },
    });
    return [userType];
  }

  @Mutation(() => Boolean)
  async signup(
    @Args(SignupInput.name) user: SignupInput,
    @GetUserAgent() userAgent: UserAgentType,
  ): Promise<boolean> {
    const success = true;
    await this.userService.signup({
      ...user,
      term: {
        acceptedAt: new Date(),
        ip: user.ip,
        userAgent,
      },
    });
    return success;
  }

  @Mutation(() => JWTPayloadType)
  async signing(@Args(SiginInput.name) args: SiginInput): Promise<JWTPayload> {
    return this.userService.signin(args);
  }
}
