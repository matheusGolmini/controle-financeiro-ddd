import { PasswordValueObject } from './password.value-object';
import { hashSync } from 'bcrypt';
import { ERROR_MESSAGES } from '@shared/index';

describe('password.value-object.', () => {
  it('Should create a valid password', () => {
    const passwordMock = '123abc';
    const password = PasswordValueObject.create(passwordMock);

    expect(password.isSuccess).toBe(true);
    expect(password.getResult().value).toBe(passwordMock);
    expect(password.getResult().isAlreadyEncrypt()).toBe(false);
  });

  it('Should fail if password is not on range min 3 char and man 20 char', () => {
    const shortPasswordMock = '1c';
    const password1 = PasswordValueObject.create(shortPasswordMock);

    expect(password1.isFailure).toBe(true);
    expect(password1.error).toBe(ERROR_MESSAGES.INVALID_PASSWORD);

    const longPasswordMock = '1c54564654654651526854115';
    const password2 = PasswordValueObject.create(longPasswordMock);

    expect(password2.isFailure).toBe(true);
    expect(password2.error).toBe(ERROR_MESSAGES.INVALID_PASSWORD);
  });

  it('Should create a valid encrypted password', () => {
    const encryptedPass = hashSync('123abc', 10);
    const password = PasswordValueObject.create(encryptedPass);

    expect(password.isSuccess).toBe(true);
    expect(password.getResult().value).toBe(encryptedPass);
  });

  it('Should create a valid password and encrypted after create', () => {
    const password = PasswordValueObject.create('123abc');
    expect(password.getResult().isAlreadyEncrypt()).toBe(false);
    password.getResult().encryptPassword();
    expect(password.getResult().isAlreadyEncrypt()).toBe(true);
  });
});
