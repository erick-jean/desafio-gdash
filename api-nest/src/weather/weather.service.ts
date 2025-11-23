import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { Model } from 'mongoose';
import { Weather } from './entities/weather.entity';

@Injectable()
export class WeatherService {
  constructor(
    @InjectModel(Weather.name)
    private readonly weatherModel: Model<Weather>,
  ) {}
  async create(createWeatherDto: CreateWeatherDto) {
    return await this.weatherModel.create(createWeatherDto);
  }

  async findAll() {
    return await this.weatherModel.find().lean();
  }

  exportCsv() {
    return `This action exports weather data to CSV`;
  }

  exportXlsx() {
    return `This action exports weather data to XLSX`;
  }

  getInsights() {
    return `This action provides weather insights`;
  }
}
