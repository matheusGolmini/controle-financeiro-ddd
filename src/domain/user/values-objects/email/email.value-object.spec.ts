import { EmailValueObject } from './email.value-object';
import { ERROR_MESSAGES } from '../../../shared';

describe('email.value-object', () => {
  it('Should return a valid email', () => {
    const email = EmailValueObject.create('valid_mail@domain.com');
    expect(email.isFailure).toBe(false);
  });

  it('Should return fail if provide an invalid email', () => {
    const email = EmailValueObject.create(ERROR_MESSAGES.INVALID_EMAIL);
    expect(email.isFailure).toBe(true);
  });

  it('Should normalize email to lowercase', () => {
    const emailMock = 'VALID_mail@domain.com';
    const email = EmailValueObject.create(emailMock);

    expect(email.getResult().value).toBe(emailMock.toLocaleLowerCase());
  });
});
