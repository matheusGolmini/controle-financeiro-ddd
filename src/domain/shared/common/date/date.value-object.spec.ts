import { DateValueObject } from './date.value-object';

describe('acceptedAt.value-object', () => {
  it('Should return a valid acceptedAt', () => {
    const acceptedAt = DateValueObject.create(new Date('2021-02-01 10:00:00'));
    expect(acceptedAt.isFailure).toBe(false);
  });

  it('Should return fail if provide an invalid acceptedAt', () => {
    const acceptedAt = DateValueObject.create('invalid date' as any);
    expect(acceptedAt.isFailure).toBe(true);
  });
});
