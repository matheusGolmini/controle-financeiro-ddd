import { PasswordValueObject } from './password.value-object';

describe('password.value-object.', () => {
  it('Should create a valid password', () => {
    const passwordMock = '123abc';
    const password = PasswordValueObject.create(passwordMock);

    expect(password.isSuccess).toBe(true);
    expect(password.getResult().value).toBe(passwordMock);
  });

  it('Should fail if password is not on range min 3 char and man 20 char', () => {
    const shortPasswordMock = '1c';
    const password1 = PasswordValueObject.create(shortPasswordMock);

    expect(password1.isFailure).toBe(true);
    expect(password1.error).toBe(
      'Password must have min 3 char and max 20 char',
    );

    const longPasswordMock = '1c54564654654651526854115';
    const password2 = PasswordValueObject.create(longPasswordMock);

    expect(password2.isFailure).toBe(true);
    expect(password2.error).toBe(
      'Password must have min 3 char and max 20 char',
    );
  });
});
