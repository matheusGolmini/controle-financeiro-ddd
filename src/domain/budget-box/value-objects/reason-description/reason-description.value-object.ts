import { Result, ValueObject, ERROR_MESSAGES } from '../../../shared';

export interface ReasonDescriptionValueObjectProps {
  value: string;
}

export class ReasonDescriptionValueObject extends ValueObject<ReasonDescriptionValueObjectProps> {
  private constructor(props: ReasonDescriptionValueObjectProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(
    description: string,
  ): Result<ReasonDescriptionValueObject> {
    const isValidLength =
      description.trim().length >= 1 && description.trim().length <= 20;

    return isValidLength
      ? Result.ok<ReasonDescriptionValueObject>(
          new ReasonDescriptionValueObject({
            value: description.toLowerCase(),
          }),
        )
      : Result.fail<ReasonDescriptionValueObject>(
          ERROR_MESSAGES.INVALID_REASON_DESCRIPTION_LENGHT,
        );
  }
}
