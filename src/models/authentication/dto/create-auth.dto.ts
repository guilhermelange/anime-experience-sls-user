import { ApiProperty } from '@nestjs/swagger/dist';
export class CreateAuthDto {
  @ApiProperty({ description: 'Email do usuário' })
  email: string;

  @ApiProperty({ description: 'Senha do usuário' })
  password: string;
  google?: boolean;
}

export class UserResponseDto {
  @ApiProperty({ description: 'Id do usuário' })
  id: string;

  @ApiProperty({ description: 'Nome do usuário' })
  name: string;

  @ApiProperty({ description: 'Email do usuário' })
  email: string;

  @ApiProperty({ description: 'Data de criação do usuário' })
  created_at: string;

  @ApiProperty({ description: 'Data de atualização do usuário' })
  updated_at: string;

  avatar: null;
}
export class CreateAuthResponseDto {
  @ApiProperty({ description: 'Usuário' })
  user: UserResponseDto;

  @ApiProperty({ description: 'Token de autenticação' })
  token: string;
}
