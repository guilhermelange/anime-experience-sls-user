import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, CreateAuthResponseDto } from './dto/create-auth.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger/dist/decorators';

@Controller('sessions')
@ApiTags('Users  -  /users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiResponse({
    status: 200,
    type: CreateAuthResponseDto,
  })
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.authenticateUser(createAuthDto);
  }
}
