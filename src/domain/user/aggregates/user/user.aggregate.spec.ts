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
});
