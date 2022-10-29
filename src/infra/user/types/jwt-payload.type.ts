import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JWTPayloadType {
  @Field(() => String!)
  token!: string;
}
