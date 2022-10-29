import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { USER_TOKEN } from '@repo/user.repository.interface';
import { SigninUseCase } from 'application/user/use-cases/signin/signin.use-case';
import { SignUpUseCase } from 'application/user/use-cases/signup/signup.use-case';
import { User, UserSchema } from './entities/user.schema';
import { UserMapper } from './repo/user.mapper';
import { UserRepository } from './repo/user.repository';
import { UserResolver } from './resolver/user.resolver';
import { JwtStrategy } from './services/strategies/jwt.strategy';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: 'secure_secret',
      signOptions: {
        expiresIn: '3h',
      },
    }),
  ],
  providers: [
    UserMapper,
    {
      provide: USER_TOKEN,
      useClass: UserRepository,
    },
    SignUpUseCase,
    SigninUseCase,
    UserService,
    UserResolver,
    JwtStrategy,
  ],
  exports: [],
})
export class UserModule {}
