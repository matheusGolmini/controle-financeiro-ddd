import { Result, ValueObject, ERROR_MESSAGES } from '@shared/index';
import isIp from 'validator/lib/isIP';

export interface IpValueObjectProps {
  value: string;
}

export class IpValueObject extends ValueObject<IpValueObjectProps> {
  private constructor(props: IpValueObjectProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(ip: string): Result<IpValueObject> {
    const isValidIp = isIp(ip);

    return isValidIp
      ? Result.ok<IpValueObject>(new IpValueObject({ value: ip }))
      : Result.fail(ERROR_MESSAGES.INVALID_IP);
  }
}
