import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SiginInput {
  @Field(() => String!)
  email!: string;

  @Field(() => String!)
  password!: string;
}
