import { BudgetIdValueObject } from '@domain-budget-box/value-objects';
import { UserAggregate } from '@domain-user/aggregates';
import {
  DateValueObject,
  EmailValueObject,
  IpValueObject,
  PasswordValueObject,
  TermValueObject,
} from '@domain-user/values-objects';
import UniqueEntityID from '@shared-core/unique-entity-id';
import { IMapper } from '@shared/repo';
import { User } from '../entities/user.schema';

export class UserMapper implements IMapper<UserAggregate, User> {
  toDomain(target: User): UserAggregate {
    return UserAggregate.create(
      {
        email: EmailValueObject.create(target.email).getResult(),
        password: PasswordValueObject.create(target.password).getResult(),
        terms: target.terms.map((term) =>
          TermValueObject.create({
            acceptedAt: DateValueObject.create(term.acceptedAt).getResult(),
            ip: IpValueObject.create(term.ip).getResult(),
            userAgent: {
              name: term.userAgent.name,
              os: term.userAgent.os,
              type: term.userAgent.type,
              version: term.userAgent.version,
            },
          }).getResult(),
        ),
        totalBalanceAvalable: target.totalBalanceAvalable,
        budgetBoxIds: target.budgetBoxIds.map((box) =>
          BudgetIdValueObject.create(new UniqueEntityID(box)).getResult(),
        ),
        createdAt: target.createdAt,
        updatedAt: target.updatedAt,
      },
      new UniqueEntityID(target.id),
    ).getResult();
  }
  toPersistence(target: UserAggregate): User {
    return {
      id: target.id.toString(),
      email: target.email.value,
      password: target.password.value,
      terms: target.terms.map(({ term }) => {
        return {
          acceptedAt: term.acceptedAt.value,
          ip: term.ip.value,
          userAgent: term.userAgent,
        };
      }),
      totalBalanceAvalable: target.totalBalanceAvalable,
      budgetBoxIds: target.budgetBoxIds.map(({ id }) => id.toString()),
      createdAt: target.createdAt,
      updatedAt: target.updatedAt,
    };
  }
}
