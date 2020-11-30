import { prop, getModelForClass } from "@typegoose/typegoose";
import mongoose from "mongoose";

export class User {
  @prop({ default: new mongoose.Types.ObjectId() })
  public _id!: mongoose.Types.ObjectId;

  @prop({ unique: true })
  public username!: string;

  @prop()
  public firstname!: string;

  @prop()
  public secondname!: string;

  @prop()
  public password!: string;

  @prop()
  public email!: string;

  @prop({ default: false })
  public isAdmin!: boolean;

  @prop({ default: true })
  public isActive!: boolean;

  @prop({ default: false })
  public isExternal!: boolean;

  @prop({ type: () => [String] })
  public groups!: string[];
}

export const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true },
});
