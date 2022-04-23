import { AggregateRoot, Result, UniqueEntityID } from '@shared/index';
import { UserIdValueObject } from '@domain-user/values-objects';
import { ReasonDomainEntity } from '@domain-budget-box/entities';
import {
  BudgetDescriptionValueObject,
  PercentageValueObject,
} from '@domain-budget-box/value-objects';

export interface BudgetBoxAggregateProps {
  ownerId: UserIdValueObject;
  description: BudgetDescriptionValueObject;
  balanceAvaliable: number;
  isPercentual: boolean;
  budgetPercentage: PercentageValueObject;
  reasons: ReasonDomainEntity[];
}

export class BudgetBoxAggregate extends AggregateRoot<BudgetBoxAggregateProps> {
  private constructor(props: BudgetBoxAggregateProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get description(): BudgetDescriptionValueObject {
    return this.props.description;
  }

  get ownerId(): UserIdValueObject {
    return this.props.ownerId;
  }

  get balanceAvaliable(): number {
    return this.props.balanceAvaliable;
  }

  get isPercentual(): boolean {
    return this.props.isPercentual;
  }

  get budgetPercentage(): PercentageValueObject {
    return this.props.budgetPercentage;
  }

  get reasons(): ReasonDomainEntity[] {
    return this.props.reasons;
  }

  public static create(
    props: BudgetBoxAggregateProps,
    id?: UniqueEntityID,
  ): Result<BudgetBoxAggregate> {
    if (!props.isPercentual && props.budgetPercentage.value < 100) {
      props.budgetPercentage = PercentageValueObject.create(100).getResult();
    }
    return Result.ok<BudgetBoxAggregate>(new BudgetBoxAggregate(props, id));
  }
}
