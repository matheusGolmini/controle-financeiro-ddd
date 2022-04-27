import { BudgetIdValueObject } from '@domain-budget-box/value-objects';
import { UserAggregate } from '@domain-user/aggregates';
import {
  EmailValueObject,
  PasswordValueObject,
  TermValueObject,
  IpValueObject,
} from '@domain-user/values-objects';
import { DateValueObject } from '@shared-common/index';
import UniqueEntityID from '@shared-core/unique-entity-id';
import { User } from '../entities/user.schema';
import { UserMapper } from './user.mapper';

describe('user.mapper', () => {
  let domain: UserAggregate;
  let persistence: User;
  const currentDate = new Date();

  beforeAll(() => {
    domain = UserAggregate.create(
      {
        email: EmailValueObject.create('email@valid.com').getResult(),
        password: PasswordValueObject.create('validPassword').getResult(),
        terms: [
          TermValueObject.create({
            acceptedAt: DateValueObject.create(currentDate).getResult(),
            ip: IpValueObject.create('192.158.1.38').getResult(),
            userAgent: {
              name: 'firefox',
              os: 'LINUX',
              type: 'browser',
              version: '80.0.1',
            },
          }).getResult(),
        ],
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      new UniqueEntityID('valid_id'),
    ).getResult();

    persistence = {
      createdAt: currentDate,
      email: 'email@valid.com',
      id: 'valid_id',
      password: 'validPassword',
      terms: [
        {
          acceptedAt: currentDate,
          ip: '192.158.1.38',
          userAgent: {
            name: 'firefox',
            os: 'LINUX',
            type: 'browser',
            version: '80.0.1',
          },
        },
      ],
      updatedAt: currentDate,
    };
  });

  it('Should be defined', () => {
    const mapper = new UserMapper();
    expect(mapper).toBeDefined();
  });

  it('Should convert object from persistence to domain', () => {
    const mapper = new UserMapper();
    const result = mapper.toDomain(persistence);
    expect(result).toEqual(domain);
  });

  it('Should convert object from domain to persistence', () => {
    const mapper = new UserMapper();
    const result = mapper.toPersistence(domain);
    expect(result).toEqual(persistence);
  });
});
