import { ApiProperty } from '@nestjs/swagger/dist';
export class UpdateUserDto {
  @ApiProperty({ description: 'Nome do usuário' })
  name?: string;

  @ApiProperty({ description: 'Senha do usuário', minLength: 5 })
  password?: string;
}
