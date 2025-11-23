import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { Model } from 'mongoose';
import { Weather } from './entities/weather.entity';
import * as XLSX from 'xlsx';

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

  // Gera e retorna um buffer CSV com os dados de weather
  async exportCsv(): Promise<Buffer> {
    const data = await this.weatherModel.find().lean();

    if (!data.length) {
      return Buffer.from('');
    }

    // Remove campos internos do mongoose (_id, __v)
    const cleaned = data.map(({ _id, __v, ...rest }) => rest);

    // Converte para CSV
    const header = Object.keys(cleaned[0]).join(',') + '\n';
    const body = cleaned.map((row) => Object.values(row).join(',')).join('\n');

    // Retorna como buffer
    return Buffer.from(header + body);
  }

async exportXlsx(): Promise<Buffer> {
  // Busca todos os dados de weather
  const data = await this.weatherModel.find().lean();

  // Verifica se há dados
  if (!data.length) {
    return Buffer.from('');
  }

  // Remover campos internos
  const cleaned = data.map(({ _id, __v, ...rest }) => rest);

  // Criar worksheet
  const worksheet = XLSX.utils.json_to_sheet(cleaned);

  // Criar workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Weather');

  // Gerar buffer
  const buffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'buffer',
  });

  return buffer;
}

  getInsights() {
    return `This action provides weather insights`;
  }
}
