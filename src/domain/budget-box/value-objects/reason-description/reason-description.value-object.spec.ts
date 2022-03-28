import { ReasonDescriptionValueObject } from './reason-description.value-object';

describe('reason-description.value-object', () => {
  it('should create a valid description value object', () => {
    const description =
      ReasonDescriptionValueObject.create('valid_description');
    expect(description.isSuccess).toBe(true);
  });

  it('should normalize description to lowercase', () => {
    const description =
      ReasonDescriptionValueObject.create('VALID_DescriPtion');
    expect(description.isSuccess).toBe(true);
    expect(description.getResult().value).toBe('valid_description');
  });

  it('should fail if not provide description', () => {
    const description = ReasonDescriptionValueObject.create('');
    expect(description.isFailure).toBe(true);
    expect(description.error).toBe(
      'Invalid description lenght min 1 char and max 20 char',
    );
  });

  it('should fail if not provide long description (greatter than 20 char)', () => {
    const description = ReasonDescriptionValueObject.create(
      'Invalid description lenght greatter than max 20 char',
    );
    expect(description.isFailure).toBe(true);
    expect(description.error).toBe(
      'Invalid description lenght min 1 char and max 20 char',
    );
  });
});
