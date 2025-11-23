import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';
export class CreateWeatherDto {
  @ApiProperty()
  @IsNumber()
  coord_longitude: number;

  @ApiProperty()
  @IsNumber()
  coord_latitude: number;

  @ApiProperty()
  @IsString()
  descricao: string;

  @ApiProperty()
  @IsString()
  icon: string;

  @ApiProperty()
  @IsNumber()
  temp: number;

  @ApiProperty()
  @IsNumber()
  sensacao_termica: number;

  @ApiProperty()
  @IsNumber()
  humidity: number;

  @ApiProperty()
  @IsNumber()
  temp_min: number;

  @ApiProperty()
  @IsNumber()
  temp_max: number;

  @ApiProperty()
  @IsNumber()
  speed: number;

  @ApiProperty()
  @IsNumber()
  sunrise: number;

  @ApiProperty()
  @IsNumber()
  sunset: number;

  @ApiProperty()
  @IsNumber()
  id_city: number;

  @ApiProperty()
  @IsString()
  name_city: string;
}
