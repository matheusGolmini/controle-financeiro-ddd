import { UniqueEntityID } from '../../../shared';
import { ReasonIdValueObject } from './reason-id.value-object';

describe('reason-id.value-object', () => {
  it('Should create a valid reasonId', () => {
    const userId = ReasonIdValueObject.create();
    expect(userId.isSuccess).toBe(true);
  });

  it('Should create a valid reasonId with value', () => {
    const id = 'valid_id';
    const userId = ReasonIdValueObject.create(new UniqueEntityID(id));

    expect(userId.isSuccess).toBe(true);
    expect(userId.getResult().id.toValue()).toBe(id);
  });
});
