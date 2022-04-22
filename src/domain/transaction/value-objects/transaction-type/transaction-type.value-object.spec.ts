import { TransactionTypeValueObject } from './transaction-type.value-object';
import { ERROR_MESSAGES } from '../../../shared';

describe('transaction-type.value-object', () => {
  it('Should create a valid transaction-type ', () => {
    const transactionType = TransactionTypeValueObject.create('ENTRADA');

    expect(transactionType.isSuccess).toBe(true);
  });

  it('Should fail if provide an invalid transaction-type as string', () => {
    const transactionType = TransactionTypeValueObject.create(
      'INVALID_TYPE' as any,
    );

    expect(transactionType.isSuccess).toBe(false);
    expect(transactionType.error).toBe(
      ERROR_MESSAGES.INVALID_ENUM_TRANSACTION_TYPE,
    );
  });
});
