import { IOs } from '@domain-user/values-objects';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface IUserAgent {
  name: string;
  version: string;
  os: keyof typeof IOs;
  type: string;
}

export interface ITerm {
  ip: string;
  acceptedAt: Date;
  userAgent: IUserAgent;
}

@Schema({ autoCreate: true, timestamps: true, autoIndex: true })
export class User {
  @Prop({ immutable: true, required: true, type: String, index: true })
  readonly id!: string;

  @Prop({ required: true, index: true, type: String })
  email!: string;

  @Prop({ type: String, required: true })
  password!: string;

  @Prop({ type: Array, default: [] })
  budgetBoxIds!: string[];

  @Prop({ type: Number, required: true, default: 0 })
  totalBalanceAvalable!: number;

  @Prop({ type: Array, required: true })
  terms!: Array<ITerm>;

  @Prop({ type: Date, required: true, default: new Date() })
  createdAt!: Date;

  @Prop({ type: Date, required: true, default: new Date() })
  updatedAt: Date;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
