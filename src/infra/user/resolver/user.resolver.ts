import { Query, Resolver } from '@nestjs/graphql';
import { UserType } from '../types/user.type';

@Resolver(() => UserType)
export class UserResolver {
  @Query(() => [UserType])
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
}
