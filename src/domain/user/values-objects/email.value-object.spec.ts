import { EmailValueObject } from './email.value-object.';

describe('email.value-object', () => {
  it('Should return a valid email', () => {
    const email = EmailValueObject.create('valid_mail@domain.com');
    expect(email.isFailure).toBe(false);
  });

  it('Should return fail if provide an invalid email', () => {
    const email = EmailValueObject.create('invalidMail.com');
    expect(email.isFailure).toBe(true);
  });
});
