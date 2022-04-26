import { UserAggregate } from '@domain-user/aggregates';
import { User } from '@infra/user/entities/user.schema';
import { IBaseRepository } from '@shared/repo/base.repository.interface';

export type IUserRepository = IBaseRepository<UserAggregate, User>;
