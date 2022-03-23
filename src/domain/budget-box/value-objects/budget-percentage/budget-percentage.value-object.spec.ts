import { BudgetPercentageValueObject } from './budget-percentage.value-object';

describe('budget-percentage.value-object', () => {
  it('Should create a valid budget percentage value object', () => {
    const budgetPercentage = BudgetPercentageValueObject.create(10);
    expect(budgetPercentage.isSuccess).toBe(true);
  });

  it('Should fail if it does not provide a budget percentage less than 0', () => {
    const budgetPercentage = BudgetPercentageValueObject.create(-1);
    expect(budgetPercentage.isFailure).toBe(true);
    expect(budgetPercentage.error).toBe(
      'Invalid budgetPercentage the value must be between 0 and 100',
    );
  });

  it('Should fail if you do not provide a budget percentage greater than 100', () => {
    const budgetPercentage = BudgetPercentageValueObject.create(101);
    expect(budgetPercentage.isFailure).toBe(true);
    expect(budgetPercentage.error).toBe(
      'Invalid budgetPercentage the value must be between 0 and 100',
    );
  });
});
