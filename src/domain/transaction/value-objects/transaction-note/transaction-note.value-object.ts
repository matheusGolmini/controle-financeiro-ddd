import { Result, ValueObject } from '../../../../domain/shared';

export interface TransactionNoteValueObjectProps {
  value: string;
}

export class TransactionNoteValueObject extends ValueObject<TransactionNoteValueObjectProps> {
  private constructor(props: TransactionNoteValueObjectProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(note: string): Result<TransactionNoteValueObject> {
    const isValidLength = note.length <= 144;

    return isValidLength
      ? Result.ok<TransactionNoteValueObject>(
          new TransactionNoteValueObject({ value: note }),
        )
      : Result.fail<TransactionNoteValueObject>(
          'Note value should be less than 144 char',
        );
  }
}
