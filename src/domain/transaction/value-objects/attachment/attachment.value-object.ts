import { Result, ValueObject, ERROR_MESSAGES } from '@shared/index';
import isURL from 'validator/lib/isURL';
const validateDirectoryPath = /^(.+)\/([^\/]+)$/;

export interface AttachmentValueObjectProps {
  value: string;
}

export class AttachmentValueObject extends ValueObject<AttachmentValueObjectProps> {
  private constructor(props: AttachmentValueObjectProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(path: string): Result<AttachmentValueObject> {
    const isValidUrl = isURL(path);
    const isValidDirectory = validateDirectoryPath.test(path);

    if (!isValidUrl && !isValidDirectory) {
      return Result.fail<AttachmentValueObject>(
        ERROR_MESSAGES.INVALID_ATTACHMENT_PATH,
      );
    }

    return Result.ok<AttachmentValueObject>(
      new AttachmentValueObject({ value: path }),
    );
  }
}
