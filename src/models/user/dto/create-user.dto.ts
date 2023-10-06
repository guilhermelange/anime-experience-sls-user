import { ApiProperty } from '@nestjs/swagger/dist';
export class CreateUserDto {
  @ApiProperty({ description: 'Nome do usuário' })
  name: string;

  @ApiProperty({ description: 'Email do usuário' })
  email: string;

  @ApiProperty({ description: 'Senha do usuário', minLength: 5 })
  password: string;
}
