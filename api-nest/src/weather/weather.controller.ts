import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { WeatherService } from './weather.service';
import type { CreateWeatherDto } from './dto/create-weather.dto';
import type { Response } from 'express';
import { ApiTags, ApiProduces, ApiOkResponse } from '@nestjs/swagger';

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

  // Exporta dados em CSV
  @Get('/export.csv')
  @ApiProduces('text/csv')
  @ApiOkResponse({ description: 'CSV file' })
  async exportCsv(@Res() res: Response) {
    const buffer = await this.weatherService.exportCsv();

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="weather.csv"');

    res.send(buffer);
  }

  // Exporta dados em XLSX
  @Get('/export.xlsx')
  // Informa ao Swagger qual o tipo de arquivo que essa rota produz
  @ApiProduces(
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  )
  // Descrição no Swagger
  @ApiOkResponse({ description: 'XLSX file' })
  async exportXlsx(@Res() res: Response) {
    // Chama o service que gera o arquivo XLSX e devolve como Buffer
    const buffer = await this.weatherService.exportXlsx();

    // Define o Content-Type do arquivo XLSX
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    // Define que o navegador deve baixar o arquivo como attachment
    res.setHeader('Content-Disposition', 'attachment; filename="weather.xlsx"');
    res.send(buffer);
  }

  @Get('/insights')
  getInsights() {
    // Envia o buffer para o navegador → download automático
    return this.weatherService.getInsights();
  }
}
