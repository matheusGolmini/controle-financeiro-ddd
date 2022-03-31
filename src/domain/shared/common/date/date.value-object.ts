import { Result, ValueObject } from '../..';
import { format, isDate } from 'date-fns';

export interface DateValueObjectProps {
  value: Date;
}

export class DateValueObject extends ValueObject<DateValueObjectProps> {
  private constructor(props: DateValueObjectProps) {
    super(props);
  }

  get value(): string {
    return format(this.props.value, 'yyyy-MM-dd hh:mm:ss');
  }

  public static create(acceptedAt: Date): Result<DateValueObject> {
    const isValidDate = isDate(acceptedAt);

    return isValidDate
      ? Result.ok(new DateValueObject({ value: acceptedAt }))
      : Result.fail('Invalid date');
  }
}
