import { DateValueObject } from '../../../shared/common/date/date.value-object';
import { IpValueObject } from '../ip/ip.value-object';
import { TermValueObject } from './term.value-object';

describe('term.value-object', () => {
  it('Shoud create a valid term', () => {
    const term = TermValueObject.create({
      ip: IpValueObject.create('123.123.123.123').getResult(),
      acceptedAt: DateValueObject.create(new Date()).getResult(),
      userAgent: {
        name: 'firefox',
        version: '86.0.0',
        os: 'LINUX',
        type: 'browser',
      },
    });

    expect(term.isSuccess).toBe(true);
    expect(term.getResult().value).toBe(term.getResult().value);
  });

  it('Shoud fail if provide an invalid os', () => {
    const term = TermValueObject.create({
      ip: IpValueObject.create('123.123.123.123').getResult(),
      acceptedAt: DateValueObject.create(new Date()).getResult(),
      userAgent: {
        name: 'firefox',
        version: '86.0.0',
        os: 'invalid' as any,
        type: 'browser',
      },
    });

    expect(term.isFailure).toBe(true);
    expect(term.error).toBe('Invalid Os');
  });
});
