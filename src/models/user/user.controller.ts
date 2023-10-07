import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiSecurity,
} from '@nestjs/swagger/dist/decorators';
import { UserResponseDto } from '../authentication/dto/create-auth.dto';
@Controller('mngt')
@ApiTags('Users  -  /users')
@ApiSecurity('bearer')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiResponse({
    status: 200,
    type: UserResponseDto,
  })
  @ApiOperation({ summary: 'Criar usuário' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
