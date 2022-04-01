import { Result, ValueObject } from '../../../shared';

export enum ValidStatusTypeEnum {
  'PENDENTE',
  'CONCLUIDO',
}

export type statusType = keyof typeof ValidStatusTypeEnum;

export interface StatusValueObjectProps {
  value: statusType;
}

export class StatusValueObject extends ValueObject<StatusValueObjectProps> {
  private constructor(props: StatusValueObjectProps) {
    super(props);
  }

  get value(): statusType {
    return this.props.value;
  }

  public static create(type: statusType): Result<StatusValueObjectProps> {
    const valueToUppercase = type.toUpperCase();
    const isValidEnumValue =
      Object.values(ValidStatusTypeEnum).includes(valueToUppercase);

    return isValidEnumValue
      ? Result.ok<StatusValueObject>(
          new StatusValueObject({ value: valueToUppercase as statusType }),
        )
      : Result.fail<StatusValueObject>('Invalid status');
  }
}
