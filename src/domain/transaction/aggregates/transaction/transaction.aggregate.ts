import {
  AggregateRoot,
  DateValueObject,
  ReasonIdValueObject,
  Result,
  UniqueEntityID,
} from '../../../shared';
import { UserIdValueObject } from '../../../user/values-objects';
import {
  AttachmentValueObject,
  StatusValueObject,
  TransactionNoteValueObject,
  TransactionTypeValueObject,
  TransanctionCalculationValueObject,
} from '../../value-objects';

export interface TransactionAggregateProps {
  userId: UserIdValueObject;
  reasonId: ReasonIdValueObject;
  paymentDate: DateValueObject;
  transactionType: TransactionTypeValueObject;
  status: StatusValueObject;
  transactionCalculation: TransanctionCalculationValueObject[];
  note?: TransactionNoteValueObject;
  attachment?: AttachmentValueObject;
}

export class TransactionAggregate extends AggregateRoot<TransactionAggregateProps> {
  private _totalValue: number;
  private constructor(props: TransactionAggregateProps, id?: UniqueEntityID) {
    super(props, id);
    this._totalValue = 0;
  }

  get totalValue(): number {
    return this._totalValue;
  }

  get userId(): UserIdValueObject {
    return this.props.userId;
  }

  get reasonId(): ReasonIdValueObject {
    return this.props.reasonId;
  }

  get paymentDate(): DateValueObject {
    return this.props.paymentDate;
  }

  get transactionType(): TransactionTypeValueObject {
    return this.props.transactionType;
  }

  get status(): StatusValueObject {
    return this.props.status;
  }

  get transactionCalculation(): TransanctionCalculationValueObject[] {
    return this.props.transactionCalculation;
  }

  get note(): TransactionNoteValueObject | null {
    return this.props.note ?? null;
  }

  get attachment(): AttachmentValueObject | null {
    return this.props.attachment ?? null;
  }

  private calculateTotal(): number {
    const total = this.props.transactionCalculation.reduce(
      (total, calc) => calc.calculation.value + total,
      0,
    );
    this._totalValue = total;
    return total;
  }

  public static create(
    props: TransactionAggregateProps,
    id?: UniqueEntityID,
  ): Result<TransactionAggregate> {
    const transaction = new TransactionAggregate(props, id);
    transaction.calculateTotal();
    return Result.ok<TransactionAggregate>(transaction);
  }
}
