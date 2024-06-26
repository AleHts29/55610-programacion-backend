import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from '@nestjs/config';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private config: ConfigService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get()
  async findAll() {
    // Test de utilizacion de variables de entorno
    console.log(`Quiero PAPA con ${this.config.get<string>('PAPA')}`);

    const users = await this.userService.findAll();
    return { status: 'Success', payload: users }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // Definimos una excepcion
    if (isNaN(+id)) throw new HttpException("El id debe ser numero", HttpStatus.BAD_REQUEST)
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
