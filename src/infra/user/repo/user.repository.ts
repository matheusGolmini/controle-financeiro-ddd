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

  find(filter: Filter<Partial<User>>): Promise<UserAggregate[]> {
    throw new Error('Method not implemented');
  }
  findOne(filter: Filter<Partial<User>>): Promise<UserAggregate> {
    throw new Error('Method not implemented');
  }
  delete(filter: Filter<Partial<User>>): Promise<void> {
    throw new Error('Method not implemented');
  }

  async exists(filter: Filter<Partial<User>>): Promise<boolean> {
    const existingUser = await this.conn.exists(filter);
    return !!existingUser;
  }

  async save(target: UserAggregate): Promise<void> {
    const schema = this.mapper.toPersistence(target);
    const user = new this.conn(schema);
    await user.save();
  }
}
