import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcryptjs';
import { PrismaService } from '../../common/database';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    const checkUserExists = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (checkUserExists) {
      throw new HttpException('Email adress already used', 400);
    }

    const hashedPassword = await hash(password, 8);
    createUserDto.password = hashedPassword;

    const createdUser = await this.prisma.user.create({
      data: createUserDto,
    });

    createdUser.password = undefined;
    return createdUser;
  }
}
