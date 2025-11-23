import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Weather extends Document {
  @Prop()
  coord_longitude: number;

  @Prop()
  coord_latitude: number;

  @Prop()
  descricao: string;

  @Prop()
  icon: string;

  @Prop()
  temp: number;

  @Prop()
  sensacao_termica: number;

  @Prop()
  humidity: number;

  @Prop()
  temp_min: number;

  @Prop()
  temp_max: number;

  @Prop()
  speed: number;

  @Prop()
  sunrise: number;

  @Prop()
  sunset: number;

  @Prop()
  id_city: number;

  @Prop()
  name_city: string;
}

export const WeatherSchema = SchemaFactory.createForClass(Weather);
