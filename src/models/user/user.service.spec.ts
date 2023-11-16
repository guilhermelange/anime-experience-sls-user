import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaModule, PrismaService } from '../../common/database';
import { CreateUserDto } from './dto/create-user.dto';

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const user = { id: '1', name: 'Guilherme' };
      const createUserDto = {
        email: 'gui.luizlange@gmail.com',
        name: 'Guilherme',
        password: '12345',
      } as CreateUserDto;
      prisma.user.findFirst = jest.fn().mockResolvedValueOnce(null);
      prisma.user.create = jest.fn().mockResolvedValueOnce({
        ...user,
        password: '',
      } as any);

      const response = await service.create(createUserDto);
      expect(response.id).toEqual('1');
      expect(prisma.user.findFirst).toBeCalledTimes(1);
      expect(prisma.user.create).toBeCalledTimes(1);
    });

    it('should return a error', async () => {
      prisma.user.findFirst = jest.fn().mockResolvedValueOnce(null);
      prisma.user.create = jest.fn().mockResolvedValueOnce(null);
      const createUserDto = {
        email: 'gui.luizlangexxxx@gmail.com',
        name: 'Guilherme',
        password: '12345',
      } as CreateUserDto;

      expect(service.create(createUserDto)).rejects.toThrowError();
      expect(prisma.user.findFirst).toBeCalledTimes(1);
      expect(prisma.user.create).toBeCalledTimes(0);
    });
  });
});
