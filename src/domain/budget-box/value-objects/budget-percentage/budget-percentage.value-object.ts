import { Result, ValueObject } from '../../../shared';

export interface BudgetPercentageValueObjectProps {
  value: number;
}

export class BudgetPercentageValueObject extends ValueObject<BudgetPercentageValueObjectProps> {
  private constructor(props: BudgetPercentageValueObjectProps) {
    super(props);
  }

  get value(): number {
    return this.props.value;
  }

  public static create(
    budgetPercentage: number,
  ): Result<BudgetPercentageValueObjectProps> {
    const isValidLength = budgetPercentage >= 0 && budgetPercentage <= 100;

    return isValidLength
      ? Result.ok<BudgetPercentageValueObject>(
          new BudgetPercentageValueObject({
            value: budgetPercentage,
          }),
        )
      : Result.fail<BudgetPercentageValueObject>(
          'Invalid budgetPercentage the value must be between 0 and 100',
        );
  }
}
