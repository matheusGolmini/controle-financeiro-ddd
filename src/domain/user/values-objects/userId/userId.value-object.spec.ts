import { UniqueEntityID } from '../../../shared';
import { UserIdValueObject } from './userId.value-object';

describe('userId.value-object', () => {
  it('Should create a valid userId', () => {
    const userId = UserIdValueObject.create();
    expect(userId.isSuccess).toBe(true);
  });

  it('Should create a valid userId with value', () => {
    const id = 'valid_id';
    const userId = UserIdValueObject.create(new UniqueEntityID(id));

    expect(userId.isSuccess).toBe(true);
    expect(userId.getResult().id.toValue()).toBe(id);
  });
});
