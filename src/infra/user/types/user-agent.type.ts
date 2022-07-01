import { IOs, systemTypes } from '@domain-user/values-objects';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

registerEnumType(IOs, {
  name: 'IOs',
});

@ObjectType()
export class UserAgentType {
  @Field(() => String)
  name!: string;

  @Field(() => String)
  version!: string;

  @Field(() => IOs)
  os!: systemTypes;

  @Field(() => String)
  type!: string;
}
