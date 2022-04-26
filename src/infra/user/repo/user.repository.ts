/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserAggregate } from '@domain-user/aggregates';
import { Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Filter } from '@shared/repo';
import { IUserRepository } from 'repo/user.repository.interface';
import { User, UserDocument } from '../entities/user.schema';
import { UserMapper } from './user.mapper';
import { Model } from 'mongoose';

export class UserRepository implements IUserRepository {
  constructor(
    @Inject(UserMapper) private readonly mapper: UserMapper,
    @InjectModel(User.name) private readonly conn: Model<UserDocument>,
  ) {}

  exists(filter: Filter<Partial<User>>): Promise<boolean> {
    throw new Error('Method not implemented');
  }
  find(filter: Filter<Partial<User>>): Promise<UserAggregate[]> {
    throw new Error('Method not implemented');
  }
  findOne(filter: Filter<Partial<User>>): Promise<UserAggregate> {
    throw new Error('Method not implemented');
  }
  delete(filter: Filter<Partial<User>>): Promise<void> {
    throw new Error('Method not implemented');
  }
  save(target: UserAggregate): Promise<void> {
    throw new Error('Method not implemented');
  }
}
