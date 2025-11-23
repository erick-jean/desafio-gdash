import { Controller, Get, Post, Body } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('weather')
@Controller('api/weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Post()
  create(@Body() createWeatherDto: CreateWeatherDto) {
    return this.weatherService.create(createWeatherDto);
  }

  @Get('/logs')
  findAll() {
    return this.weatherService.findAll();
  }

  @Get('/export.csv')
  exportCsv() {
    return this.weatherService.exportCsv();
  }

  @Get('/export.xlsx')
  exportXlsx() {
    return this.weatherService.exportXlsx();
  }

  @Get('/insights')
  getInsights() {
    return this.weatherService.getInsights();
  }
}
