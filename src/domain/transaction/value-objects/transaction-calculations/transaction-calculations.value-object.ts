import { BudgetIdValueObject } from '../../../budget-box/value-objects';
import { Result, ValueObject } from '../../../shared';

interface CalculationProps {
  budgetboxId: BudgetIdValueObject;
  value: number;
}

export interface TransanctionCalculationValueObjectProps {
  calculation: CalculationProps;
}

export class TransanctionCalculationValueObject extends ValueObject<TransanctionCalculationValueObjectProps> {
  private constructor(props: TransanctionCalculationValueObjectProps) {
    super(props);
  }

  get calculation(): CalculationProps {
    return this.props.calculation;
  }

  public static create(
    calculation: CalculationProps,
  ): Result<TransanctionCalculationValueObject> {
    const isValuePositive = calculation.value >= 0;

    return isValuePositive
      ? Result.ok<TransanctionCalculationValueObject>(
          new TransanctionCalculationValueObject({ calculation }),
        )
      : Result.fail<TransanctionCalculationValueObject>(
          'Value should be positive',
        );
  }
}