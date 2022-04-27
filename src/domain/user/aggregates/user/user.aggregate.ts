import { AggregateRoot, Result, UniqueEntityID } from '@shared/index';
import {
  EmailValueObject,
  PasswordValueObject,
  TermValueObject,
} from '@domain-user/values-objects';

export interface UserAggregateProps {
  email: EmailValueObject;
  password: PasswordValueObject;
  terms: TermValueObject[];
  createdAt: Date;
  updatedAt: Date;
}

export class UserAggregate extends AggregateRoot<UserAggregateProps> {
  private constructor(props: UserAggregateProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public get email(): EmailValueObject {
    return this.props.email;
  }

  public get password(): PasswordValueObject {
    return this.props.password;
  }

  public get terms(): TermValueObject[] {
    return this.props.terms;
  }

  public static create(
    props: UserAggregateProps,
    id?: UniqueEntityID,
  ): Result<UserAggregate> {
    return Result.ok<UserAggregate>(new UserAggregate(props, id));
  }
}
