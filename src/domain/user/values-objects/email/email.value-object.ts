import { Result, ValueObject, ERROR_MESSAGES } from '../../../shared';
import isEmail from 'validator/lib/isEmail';

export interface EmailValueObjectProps {
  value: string;
}

export class EmailValueObject extends ValueObject<EmailValueObjectProps> {
  private constructor(props: EmailValueObjectProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(email: string): Result<EmailValueObject> {
    const isValidEmail = isEmail(email);

    return isValidEmail
      ? Result.ok<EmailValueObject>(
          new EmailValueObject({ value: email.toLocaleLowerCase() }),
        )
      : Result.fail<EmailValueObject>(ERROR_MESSAGES.INVALID_EMAIL);
  }
}
