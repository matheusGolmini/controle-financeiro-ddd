import { IpValueObject } from './ip.value-object';

describe('ip.value-object', () => {
  it('Should return a valid ip', () => {
    const ip = IpValueObject.create('192.158.1.38');
    expect(ip.isFailure).toBe(false);
  });

  it('Should return fail if provide an invalid ip', () => {
    const ip = IpValueObject.create('192.158.1.zas');
    expect(ip.isFailure).toBe(true);
  });
});
