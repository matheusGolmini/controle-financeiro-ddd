import { Result, ValueObject, ERROR_MESSAGES } from '@shared/index';

export interface BudgetDescriptionValueObjectProps {
  value: string;
}

export class BudgetDescriptionValueObject extends ValueObject<BudgetDescriptionValueObjectProps> {
  private constructor(props: BudgetDescriptionValueObjectProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(
    description: string,
  ): Result<BudgetDescriptionValueObject> {
    const isValidLength =
      description.trim().length >= 1 && description.trim().length <= 30;

    return isValidLength
      ? Result.ok<BudgetDescriptionValueObject>(
          new BudgetDescriptionValueObject({
            value: description.toLowerCase(),
          }),
        )
      : Result.fail<BudgetDescriptionValueObject>(
          ERROR_MESSAGES.BUDGET_DESCRIPTION_LENGTH,
        );
  }
}
