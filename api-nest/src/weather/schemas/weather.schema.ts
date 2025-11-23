import { Schema, model } from 'mongoose';

const WeatherSchema = new Schema(
  {
    coord_longitude: Number,
    coord_latitude: Number,

    descricao: String,
    icon: String,

    temp: Number,
    sensacao_termica: Number,
    humidity: Number,

    temp_min: Number,
    temp_max: Number,

    speed: Number,

    sunrise: Number,
    sunset: Number,

    id_city: Number,
    name_city: String,
  },
  { timestamps: true }
);

export default model('Weather', WeatherSchema);
