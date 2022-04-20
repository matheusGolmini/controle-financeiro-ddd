import { BudgetIdValueObject } from '../../../budget-box/value-objects';
import {
  DateValueObject,
  ReasonIdValueObject,
  UniqueEntityID,
} from '../../../shared';
import { UserIdValueObject } from '../../../user/values-objects';
import {
  TransactionNoteValueObject,
  TransanctionCalculationValueObject,
  StatusValueObject,
  AttachmentValueObject,
  TransactionTypeValueObject,
} from '../../value-objects';
import { TransactionAggregate } from './transaction.aggregate';

describe('transaction.aggregate', () => {
  it('should create a valid transaction', () => {
    const transaction = TransactionAggregate.create({
      userId: UserIdValueObject.create().getResult(),
      reasonId: ReasonIdValueObject.create().getResult(),
      paymentDate: DateValueObject.create(new Date()).getResult(),
      transactionType: TransactionTypeValueObject.create('ENTRADA').getResult(),
      status: StatusValueObject.create('CONCLUIDO').getResult(),
      note: TransactionNoteValueObject.create('valid_description').getResult(),
      attachment: AttachmentValueObject.create(
        'https://aws.s3.com/bucket-askjdas656/file.pdf',
      ).getResult(),
      transactionCalculation: [
        TransanctionCalculationValueObject.create({
          budgetboxId: BudgetIdValueObject.create(
            new UniqueEntityID(),
          ).getResult(),
          value: 100,
        }).getResult(),
      ],
    });

    expect(transaction.isSuccess).toBe(true);
  });

  it('should create a valid transaction with updated total', () => {
    const transaction = TransactionAggregate.create({
      userId: UserIdValueObject.create().getResult(),
      reasonId: ReasonIdValueObject.create().getResult(),
      paymentDate: DateValueObject.create(new Date()).getResult(),
      transactionType: TransactionTypeValueObject.create('ENTRADA').getResult(),
      status: StatusValueObject.create('CONCLUIDO').getResult(),
      note: TransactionNoteValueObject.create('valid_description').getResult(),
      attachment: AttachmentValueObject.create(
        'https://aws.s3.com/bucket-askjdas656/file.pdf',
      ).getResult(),
      transactionCalculation: [
        TransanctionCalculationValueObject.create({
          budgetboxId: BudgetIdValueObject.create(
            new UniqueEntityID(),
          ).getResult(),
          value: 100,
        }).getResult(),
        TransanctionCalculationValueObject.create({
          budgetboxId: BudgetIdValueObject.create(
            new UniqueEntityID(),
          ).getResult(),
          value: 100,
        }).getResult(),
      ],
    });

    expect(transaction.isSuccess).toBe(true);
    expect(transaction.getResult().totalValue).toBe(200);
  });

  it('should create a valid transaction with provided id', () => {
    const transaction = TransactionAggregate.create(
      {
        userId: UserIdValueObject.create().getResult(),
        reasonId: ReasonIdValueObject.create().getResult(),
        paymentDate: DateValueObject.create(new Date()).getResult(),
        transactionType:
          TransactionTypeValueObject.create('ENTRADA').getResult(),
        status: StatusValueObject.create('CONCLUIDO').getResult(),
        note: TransactionNoteValueObject.create(
          'valid_description',
        ).getResult(),
        attachment: AttachmentValueObject.create(
          'https://aws.s3.com/bucket-askjdas656/file.pdf',
        ).getResult(),
        transactionCalculation: [
          TransanctionCalculationValueObject.create({
            budgetboxId: BudgetIdValueObject.create(
              new UniqueEntityID(),
            ).getResult(),
            value: 100,
          }).getResult(),
          TransanctionCalculationValueObject.create({
            budgetboxId: BudgetIdValueObject.create(
              new UniqueEntityID(),
            ).getResult(),
            value: 100,
          }).getResult(),
        ],
      },
      new UniqueEntityID('valid_id'),
    );

    expect(transaction.isSuccess).toBe(true);
    expect(transaction.getResult().id.toValue()).toBe('valid_id');
  });
});
