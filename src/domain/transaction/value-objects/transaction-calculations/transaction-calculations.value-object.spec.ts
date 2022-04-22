import { BudgetIdValueObject } from '../../../budget-box/value-objects';
import { UniqueEntityID } from '../../../shared';
import { TransanctionCalculationValueObject } from './transaction-calculations.value-object';
import { ERROR_MESSAGES } from '../../../shared';

describe('transaction-calculations.value-object', () => {
  it('Shoulde create a valid calculation', () => {
    const calculation = TransanctionCalculationValueObject.create({
      budgetboxId: BudgetIdValueObject.create(
        new UniqueEntityID('valid_budgetId'),
      ).getResult(),
      value: 200,
    });

    expect(calculation.isSuccess).toBe(true);
    expect(calculation.getResult().calculation.value).toBe(200);
    expect(calculation.getResult().calculation.budgetboxId.id.toValue()).toBe(
      'valid_budgetId',
    );
  });

  it('Shoulde fail if provide an negative number', () => {
    const calculation = TransanctionCalculationValueObject.create({
      budgetboxId: BudgetIdValueObject.create(
        new UniqueEntityID('valid_budgetId'),
      ).getResult(),
      value: -100,
    });

    expect(calculation.isSuccess).toBe(false);
    expect(calculation.error).toBe(
      ERROR_MESSAGES.TRANSACTION_CALCULATION_VALUE,
    );
  });
});
