import { StatusValueObject } from './status.value-object';
import { ERROR_MESSAGES } from '@shared/index';

describe('status.value-object', () => {
  it('Should create a valid status ', () => {
    const status = StatusValueObject.create('PENDENTE');

    expect(status.isSuccess).toBe(true);
  });

  it('Should create status even if value is lowercase', () => {
    const status = StatusValueObject.create('concluido' as any);

    expect(status.isSuccess).toBe(true);
    expect(status.getResult().value).toBe('CONCLUIDO');
  });

  it('Should fail if provide an invalid status as string', () => {
    const status = StatusValueObject.create('INVALID_TYPE' as any);

    expect(status.isSuccess).toBe(false);
    expect(status.error).toBe(ERROR_MESSAGES.INVALID_ENUM_TRANSACTION_STATUS);
  });
});
