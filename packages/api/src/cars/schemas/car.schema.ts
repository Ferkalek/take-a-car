import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Car extends Document {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  price: string;

  @Prop()
  isBooked: boolean;

  @Prop()
  images: string[];
}

export const CarSchema = SchemaFactory.createForClass(Car);

// second variant without using decorators
// import * as mongoose from 'mongoose';
// export const CatSchema = new mongoose.Schema({
//     title: String,
//     description: String,
//     price: String,
//     isBooked: Boolean,
//     images: Array<String>
// });
