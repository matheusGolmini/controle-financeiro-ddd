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
    const isValidEnumValue = Object.values(ValidStatusTypeEnum).includes(
      type.toUpperCase(),
    );

    return isValidEnumValue
      ? Result.ok<StatusValueObject>(
          new StatusValueObject({ value: type.toUpperCase() as statusType }),
        )
      : Result.fail<StatusValueObject>('Invalid status');
  }
}
