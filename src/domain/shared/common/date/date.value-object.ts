import { Result, ValueObject } from '../..';
import { isDate } from 'date-fns';

export interface DateValueObjectProps {
  value: Date;
}

export class DateValueObject extends ValueObject<DateValueObjectProps> {
  private constructor(props: DateValueObjectProps) {
    super(props);
  }

  get value(): Date {
    return this.props.value;
  }

  public static create(acceptedAt: Date): Result<DateValueObject> {
    const isValidDate = isDate(acceptedAt);

    return isValidDate
      ? Result.ok(new DateValueObject({ value: acceptedAt }))
      : Result.fail('Invalid date');
  }
}
