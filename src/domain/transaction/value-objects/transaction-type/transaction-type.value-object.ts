import { Result, ValueObject, ERROR_MESSAGES } from '../../../shared';

export enum ValidTransactionTypeEnum {
  'ENTRADA',
  'SAIDA',
}

export type transactionType = keyof typeof ValidTransactionTypeEnum;

export interface TransactionTypeValueObjectProps {
  value: transactionType;
}

export class TransactionTypeValueObject extends ValueObject<TransactionTypeValueObjectProps> {
  private constructor(props: TransactionTypeValueObjectProps) {
    super(props);
  }

  get value(): transactionType {
    return this.props.value;
  }

  public static create(
    type: transactionType,
  ): Result<TransactionTypeValueObject> {
    const isValidEnumValue = Object.values(ValidTransactionTypeEnum).includes(
      type.toUpperCase(),
    );

    return isValidEnumValue
      ? Result.ok<TransactionTypeValueObject>(
          new TransactionTypeValueObject({ value: type }),
        )
      : Result.fail<TransactionTypeValueObject>(
          ERROR_MESSAGES.INVALID_ENUM_TRANSACTION_TYPE,
        );
  }
}
