import { Field, ID, ObjectType } from '@nestjs/graphql';
import { TermType } from './term.type';

@ObjectType()
export class UserType {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  email!: string;

  @Field(() => [TermType], { nullable: true })
  terms!: TermType[];
}
