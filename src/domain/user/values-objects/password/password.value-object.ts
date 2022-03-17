import { Result, ValueObject } from '../../../shared';

export interface PasswordValueObjectProps {
  value: string;
}

export class PasswordValueObject extends ValueObject<PasswordValueObjectProps> {
  private constructor(props: PasswordValueObjectProps) {
    super(props);
  }

  public static create(password: string): Result<PasswordValueObject> {
    const isValidPasswordLength = password.length >= 3 && password.length <= 20;

    return isValidPasswordLength
      ? Result.ok<PasswordValueObject>(
          new PasswordValueObject({ value: password }),
        )
      : Result.fail('Password must have min 3 char and max 20 char');
  }
}
