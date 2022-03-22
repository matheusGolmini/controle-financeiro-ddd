import { AggregateRoot, Result, UniqueEntityID } from '../../../shared';
import {
  EmailValueObject,
  PasswordValueObject,
  TermValueObject,
} from '../../values-objects';

export interface UserAggregateProps {
  email: EmailValueObject;
  password: PasswordValueObject;
  budgetBoxIds?: string[];
  totalBalanceAvaliable: number;
  terms: TermValueObject[];
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

  public get budgetBoxIds(): string[] {
    return this.props.budgetBoxIds ?? [];
  }

  public get totalBalanceAvaliable(): number {
    return this.props.totalBalanceAvaliable;
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
