import { Result, ValueObject } from '../../../shared';
import isIp from 'validator/lib/isIP';

export interface IpValueObjectProps {
  value: string;
}

export class IpValueObject extends ValueObject<IpValueObjectProps> {
  private constructor(props: IpValueObjectProps) {
    super(props);
  }

  public static create(ip: string): Result<IpValueObject> {
    const isValidIp = isIp(ip);

    return isValidIp
      ? Result.ok<IpValueObject>(new IpValueObject({ value: ip }))
      : Result.fail('Invalid ip');
  }
}
