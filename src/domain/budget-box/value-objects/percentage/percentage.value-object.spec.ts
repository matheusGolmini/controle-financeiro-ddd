import { PercentageValueObject } from './percentage.value-object';

describe('percentage.value-object', () => {
  it('Should create a valid percentage value object', () => {
    const budgetPercentage = PercentageValueObject.create(10);
    expect(budgetPercentage.isSuccess).toBe(true);
  });

  it('Should fail if it does not provide a percentage less than 0', () => {
    const budgetPercentage = PercentageValueObject.create(-1);
    expect(budgetPercentage.isFailure).toBe(true);
    expect(budgetPercentage.error).toBe('Invalid Range Value');
  });

  it('Should fail if you do not provide a percentage greater than 100', () => {
    const budgetPercentage = PercentageValueObject.create(101);
    expect(budgetPercentage.isFailure).toBe(true);
    expect(budgetPercentage.error).toBe('Invalid Range Value');
  });
});
