import { Result, ValueObject, ERROR_MESSAGES } from '@shared/index';
import { hashSync, compareSync, genSaltSync } from 'bcrypt';
import { PasswordInterface } from './interfaces/password.interface';

const isEncryptPass = /\$2b\$\d\d\$[\s\S]{53}|{.}\b/gm;

export interface PasswordValueObjectProps {
  value: string;
}

export class PasswordValueObject
  extends ValueObject<PasswordValueObjectProps>
  implements PasswordInterface
{
  private isEncrypted: boolean;

  private constructor(props: PasswordValueObjectProps, isEncrypted: boolean) {
    super(props);
    this.isEncrypted = isEncrypted;
  }

  get value(): string {
    return this.props.value;
  }

  get isAlreadyEncrypt(): boolean {
    return isEncryptPass.test(this.props.value);
  }

  encryptPassword(): void {
    const salt = genSaltSync();
    this.props.value = hashSync(this.props.value, salt);
    this.isEncrypted = true;
  }

  comparePasswords(plainText: string): boolean {
    if (this.isEncrypted) {
      return compareSync(plainText, this.props.value);
    }

    return plainText === this.props.value;
  }

  public static create(password: string): Result<PasswordValueObject> {
    const isEncrypt = isEncryptPass.test(password);

    if (!isEncrypt) {
      const isValidPasswordLength =
        password.length >= 3 && password.length <= 20;

      if (!isValidPasswordLength) {
        return Result.fail(ERROR_MESSAGES.INVALID_PASSWORD);
      }
    }

    return Result.ok<PasswordValueObject>(
      new PasswordValueObject({ value: password }, isEncrypt),
    );
  }
}
