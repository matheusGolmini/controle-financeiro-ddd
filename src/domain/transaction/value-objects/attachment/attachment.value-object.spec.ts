import { faker } from '@faker-js/faker';
import { AttachmentValueObject } from './attachment.value-object';
import { ERROR_MESSAGES } from '@shared/index';

describe('attachment.value-object', () => {
  it('Should create a valid attachment', () => {
    const url = faker.internet.url();
    const attachment = AttachmentValueObject.create(url);

    expect(attachment.isSuccess).toBe(true);
    expect(attachment.getResult().value).toBe(url);
  });

  it('Should fail if provide an invalid url', () => {
    const attachment = AttachmentValueObject.create('invalid_url');

    expect(attachment.isSuccess).toBe(false);
    expect(attachment.error).toBe(ERROR_MESSAGES.INVALID_ATTACHMENT_PATH);
  });

  it('Should create a valid attachment path if provide a directory', () => {
    const attachment = AttachmentValueObject.create(
      './folder/public/image.jpeg',
    );

    expect(attachment.isSuccess).toBe(true);
    expect(attachment.getResult().value).toBe('./folder/public/image.jpeg');
  });

  it('Should fail if provide an invalid directory', () => {
    const attachment = AttachmentValueObject.create('invalid_directory');

    expect(attachment.isSuccess).toBe(false);
    expect(attachment.error).toBe(ERROR_MESSAGES.INVALID_ATTACHMENT_PATH);
  });
});
