import {
  Result,
  ValueObject,
  ERROR_MESSAGES,
  DateValueObject,
} from '@shared/index';
import { IpValueObject } from '../ip/ip.value-object';

export enum IOs {
  LINUX,
  WINDOWS,
  MACOS,
  MAC,
  APPLE,
  MACINTOSH,
  ANDROID,
  IPAD,
  IPHONE,
}

export type systemTypes = keyof typeof IOs;

export interface IUserAgent {
  name: string;
  version: string;
  os: systemTypes;
  type: string;
}

export interface TermValueObjectProps {
  ip: IpValueObject;
  acceptedAt: DateValueObject;
  userAgent: IUserAgent;
}

export class TermValueObject extends ValueObject<TermValueObjectProps> {
  private constructor(props: TermValueObjectProps) {
    super(props);
  }

  get term(): TermValueObjectProps {
    return this.props;
  }

  public static create(props: TermValueObjectProps): Result<TermValueObject> {
    const isValidOs = Object.values(IOs).includes(
      props.userAgent.os.toUpperCase() as any,
    );

    return isValidOs
      ? Result.ok<TermValueObject>(new TermValueObject(props))
      : Result.fail(ERROR_MESSAGES.INVALID_OPERATIONAL_SYSTEM);
  }
}
