import { Result, ValueObject } from '../../../shared';
import { format, isDate } from 'date-fns';

export interface AcceptedAtValueObjectProps {
  value: Date;
}

export class AcceptedAtValueObject extends ValueObject<AcceptedAtValueObjectProps> {
  private constructor(props: AcceptedAtValueObjectProps) {
    super(props);
  }

  get value(): string {
    return format(this.props.value, 'yyyy-MM-dd hh:mm:ss');
  }

  public static create(acceptedAt: Date): Result<AcceptedAtValueObject> {
    const isValidDate = isDate(acceptedAt);

    return isValidDate
      ? Result.ok(new AcceptedAtValueObject({ value: acceptedAt }))
      : Result.fail('Invalid date');
  }
}
