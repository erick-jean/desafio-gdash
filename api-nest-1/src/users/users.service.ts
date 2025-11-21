import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User, PrismaClient } from '@prisma/client';
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}


  // cria um usuário a partir do DTO, mapeando apenas os campos esperados
  async create(createUserDto: CreateUserDto) {
    const data: Prisma.UserCreateInput = {
      email: createUserDto.email,
      name: createUserDto.name ?? null,
      password: createUserDto.password,
    };

    try {
      return await this.prisma.user.create({ data });
    } catch (error: any) {
      // se for erro de unique constraint (ex: email já existe)
      if (error?.code === 'P2002') {
        throw new BadRequestException('Email já cadastrado');
      }
      throw error;
    }
  }


  findAll() {
    return;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
