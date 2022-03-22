import { UniqueEntityID } from '../../../shared';
import {
  AcceptedAtValueObject,
  EmailValueObject,
  IpValueObject,
  PasswordValueObject,
  TermValueObject,
} from '../../values-objects';
import { UserAggregate } from './user.aggregate';

describe('user.aggregate', () => {
  it('Should create a valid user', () => {
    const user = UserAggregate.create({
      email: EmailValueObject.create('email@valid.com').getResult(),
      password: PasswordValueObject.create('validPassword').getResult(),
      totalBalanceAvaliable: 0,
      budgetBoxIds: ['valid_1', 'valid_2'],
      terms: [
        TermValueObject.create({
          acceptedAt: AcceptedAtValueObject.create(new Date()).getResult(),
          ip: IpValueObject.create('192.158.1.38').getResult(),
          userAgent: {
            name: 'firefox',
            os: 'LINUX',
            type: 'browser',
            version: '80.0.1',
          },
        }).getResult(),
      ],
    });

    expect(user.isSuccess).toBe(true);
  });

  it('Should create a valid user with provided id', () => {
    const user = UserAggregate.create(
      {
        email: EmailValueObject.create('email@valid.com').getResult(),
        password: PasswordValueObject.create('validPassword').getResult(),
        totalBalanceAvaliable: 0,
        terms: [
          TermValueObject.create({
            acceptedAt: AcceptedAtValueObject.create(new Date()).getResult(),
            ip: IpValueObject.create('192.158.1.38').getResult(),
            userAgent: {
              name: 'firefox',
              os: 'LINUX',
              type: 'browser',
              version: '80.0.1',
            },
          }).getResult(),
        ],
      },
      new UniqueEntityID('valid_user_id'),
    );

    expect(user.getResult().id.toValue()).toBe('valid_user_id');
  });

  it('Should get valid user values', () => {
    const user = UserAggregate.create({
      email: EmailValueObject.create('email@valid.com').getResult(),
      password: PasswordValueObject.create('validPassword').getResult(),
      totalBalanceAvaliable: 0,
      budgetBoxIds: ['valid_1', 'valid_2'],
      terms: [
        TermValueObject.create({
          acceptedAt: AcceptedAtValueObject.create(new Date()).getResult(),
          ip: IpValueObject.create('192.158.1.38').getResult(),
          userAgent: {
            name: 'firefox',
            os: 'LINUX',
            type: 'browser',
            version: '80.0.1',
          },
        }).getResult(),
      ],
    });

    const userResult = user.getResult();

    expect(userResult.id).toBeDefined();
    expect(userResult.createdAt).toBeDefined();
    expect(userResult.email.value).toEqual('email@valid.com');
    expect(userResult.isDeleted).toBeFalsy();
    expect(userResult.password.value).toEqual('validPassword');
    expect(userResult.totalBalanceAvaliable).toBe(0);
    expect(userResult.budgetBoxIds).toEqual(['valid_1', 'valid_2']);
    expect(userResult.terms[0].value.acceptedAt.value).toBeDefined();
    expect(userResult.terms[0].value.ip.value).toBe('192.158.1.38');
    expect(userResult.terms[0].value.userAgent).toEqual({
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
      totalBalanceAvaliable: 0,
      terms: [
        TermValueObject.create({
          acceptedAt: AcceptedAtValueObject.create(new Date()).getResult(),
          ip: IpValueObject.create('192.158.1.38').getResult(),
          userAgent: {
            name: 'firefox',
            os: 'LINUX',
            type: 'browser',
            version: '80.0.1',
          },
        }).getResult(),
      ],
    });

    expect(user.getResult().budgetBoxIds).toEqual([]);
  });
});