import { BudgetDescriptionValueObject } from './budget-description.value-object';
import { ERROR_MESSAGES } from '@shared/index';

describe('budget-description.value-object', () => {
  it('should create a valid description value object', () => {
    const description =
      BudgetDescriptionValueObject.create('valid_description');
    expect(description.isSuccess).toBe(true);
  });

  it('should normalize description to lowercase', () => {
    const description =
      BudgetDescriptionValueObject.create('VALID_DescriPtion');
    expect(description.isSuccess).toBe(true);
    expect(description.getResult().value).toBe('valid_description');
  });

  it('should fail if not provide description', () => {
    const description = BudgetDescriptionValueObject.create('');
    expect(description.isFailure).toBe(true);
    expect(description.error).toBe(ERROR_MESSAGES.BUDGET_DESCRIPTION_LENGTH);
  });

  it('should fail if not provide long description (greatter than 30 char)', () => {
    const description = BudgetDescriptionValueObject.create(
      'Invalid description lenght greatter than max 30 char',
    );
    expect(description.isFailure).toBe(true);
    expect(description.error).toBe(ERROR_MESSAGES.BUDGET_DESCRIPTION_LENGTH);
  });
});
