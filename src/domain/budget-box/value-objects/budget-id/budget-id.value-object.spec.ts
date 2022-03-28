import { UniqueEntityID } from '../../../shared';
import { BudgetIdValueObject } from './budget-id.value-object';

describe('budget-id.value-object', () => {
  it('Should create a valid budget Id', () => {
    const userId = BudgetIdValueObject.create();
    expect(userId.isSuccess).toBe(true);
  });

  it('Should create a valid budget id with value', () => {
    const id = 'valid_id';
    const userId = BudgetIdValueObject.create(new UniqueEntityID(id));

    expect(userId.isSuccess).toBe(true);
    expect(userId.getResult().id.toValue()).toBe(id);
  });
});
