import { BudgetIdValueObject } from '@domain-budget-box/value-objects';
import { UniqueEntityID } from '@shared/index';
import {
  DateValueObject,
  EmailValueObject,
  IpValueObject,
  PasswordValueObject,
  TermValueObject,
} from '@domain-user/values-objects';
import { UserAggregate } from './user.aggregate';

describe('user.aggregate', () => {
  const createdAt = new Date();
  const updatedAt = new Date();

  it('Should create a valid user', () => {
    const user = UserAggregate.create({
      email: EmailValueObject.create('email@valid.com').getResult(),
      password: PasswordValueObject.create('validPassword').getResult(),
      totalBalanceAvalable: 0,
      budgetBoxIds: [
        BudgetIdValueObject.create(new UniqueEntityID('valid_id')).getResult(),
      ],
      terms: [
        TermValueObject.create({
          acceptedAt: DateValueObject.create(new Date()).getResult(),
          ip: IpValueObject.create('192.158.1.38').getResult(),
          userAgent: {
            name: 'firefox',
            os: 'LINUX',
            type: 'browser',
            version: '80.0.1',
          },
        }).getResult(),
      ],
      createdAt,
      updatedAt,
    });

    expect(user.isSuccess).toBe(true);
  });

  it('Should create a valid user with provided id', () => {
    const user = UserAggregate.create(
      {
        email: EmailValueObject.create('email@valid.com').getResult(),
        password: PasswordValueObject.create('validPassword').getResult(),
        totalBalanceAvalable: 0,
        terms: [
          TermValueObject.create({
            acceptedAt: DateValueObject.create(new Date()).getResult(),
            ip: IpValueObject.create('192.158.1.38').getResult(),
            userAgent: {
              name: 'firefox',
              os: 'LINUX',
              type: 'browser',
              version: '80.0.1',
            },
          }).getResult(),
        ],
        createdAt,
        updatedAt,
      },
      new UniqueEntityID('valid_user_id'),
    );

    expect(user.getResult().id.toValue()).toBe('valid_user_id');
  });

  it('Should get valid user values', () => {
    const user = UserAggregate.create({
      email: EmailValueObject.create('email@valid.com').getResult(),
      password: PasswordValueObject.create('validPassword').getResult(),
      totalBalanceAvalable: 0,
      budgetBoxIds: [
        BudgetIdValueObject.create(new UniqueEntityID('valid_id')).getResult(),
      ],
      terms: [
        TermValueObject.create({
          acceptedAt: DateValueObject.create(new Date()).getResult(),
          ip: IpValueObject.create('192.158.1.38').getResult(),
          userAgent: {
            name: 'firefox',
            os: 'LINUX',
            type: 'browser',
            version: '80.0.1',
          },
        }).getResult(),
      ],
      createdAt,
      updatedAt,
    });

    const userResult = user.getResult();

    const validsIds = userResult.budgetBoxIds.map((idValueObject) =>
      idValueObject.id.toValue(),
    );

    expect(userResult.id).toBeDefined();
    expect(userResult.createdAt).toBeDefined();
    expect(userResult.email.value).toEqual('email@valid.com');
    expect(userResult.isDeleted).toBeFalsy();
    expect(userResult.password.value).toEqual('validPassword');
    expect(userResult.totalBalanceAvalable).toBe(0);
    expect(validsIds).toEqual(['valid_id']);
    expect(userResult.terms[0].term.acceptedAt.value).toBeDefined();
    expect(userResult.terms[0].term.ip.value).toBe('192.158.1.38');
    expect(userResult.terms[0].term.userAgent).toEqual({
      name: 'firefox',
      os: 'LINUX',
      type: 'browser',
      version: '80.0.1',
    });
  });

  it('Should return empty array if not provide budgetBoxIds', () => {
    const user = UserAggregate.create({
      email: EmailValueObject.create('email@valid.com').getResult(),
      password: PasswordValueObject.create('validPassword').getResult(),
      totalBalanceAvalable: 0,
      terms: [
        TermValueObject.create({
          acceptedAt: DateValueObject.create(new Date()).getResult(),
          ip: IpValueObject.create('192.158.1.38').getResult(),
          userAgent: {
            name: 'firefox',
            os: 'LINUX',
            type: 'browser',
            version: '80.0.1',
          },
        }).getResult(),
      ],
      createdAt,
      updatedAt,
    });

    expect(user.getResult().budgetBoxIds).toEqual([]);
  });
});
