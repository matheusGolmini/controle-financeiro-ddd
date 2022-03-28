import { Result, ValueObject } from '../../../shared';

export interface PercentageValueObjectProps {
  value: number;
}

export class PercentageValueObject extends ValueObject<PercentageValueObjectProps> {
  private constructor(props: PercentageValueObjectProps) {
    super(props);
  }

  get value(): number {
    return this.props.value;
  }

  public static create(
    budgetPercentage: number,
  ): Result<PercentageValueObject> {
    const isValidLength = budgetPercentage >= 0 && budgetPercentage <= 100;

    return isValidLength
      ? Result.ok<PercentageValueObject>(
          new PercentageValueObject({
            value: budgetPercentage,
          }),
        )
      : Result.fail<PercentageValueObject>('Invalid Range Value');
  }
}
