import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, CreateAuthResponseDto } from './dto/create-auth.dto';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiSecurity,
} from '@nestjs/swagger/dist/decorators';

@Controller('sessions')
@ApiTags('Users  -  /users')
@ApiSecurity('bearer')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiResponse({
    status: 200,
    type: CreateAuthResponseDto,
  })
  @ApiOperation({ summary: 'Autenticar usuário' })
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.authenticateUser(createAuthDto);
  }
}
