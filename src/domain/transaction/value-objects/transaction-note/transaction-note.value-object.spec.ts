import { TransactionNoteValueObject } from './transaction-note.value-object';
import { faker } from '@faker-js/faker';

describe('transaction-note.value-object', () => {
  it('Shoud create a valid note', () => {
    const note = TransactionNoteValueObject.create('One_valid_note');

    expect(note.isSuccess).toBe(true);
    expect(note.getResult().value).toBe('One_valid_note');
  });

  it('Shoud fail if provide string greatter than 144', () => {
    const note = TransactionNoteValueObject.create(faker.lorem.paragraph(10));

    expect(note.isSuccess).toBe(false);
    expect(note.error).toBe('Note value should be less than 144 char');
  });
});
