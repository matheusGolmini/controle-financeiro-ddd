import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { USER_TYPE } from '@repo/user.repository.interface';
import { SignUpUseCase } from 'application/user/use-cases/signup/signup.use-case';
import { User, UserSchema } from './entities/user.schema';
import { UserMapper } from './repo/user.mapper';
import { UserRepository } from './repo/user.repository';
import { UserResolver } from './resolver/user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    UserMapper,
    {
      provide: USER_TYPE,
      useClass: UserRepository,
    },
    SignUpUseCase,
    UserService,
    UserResolver,
  ],
  exports: [],
})
export class UserModule {}
