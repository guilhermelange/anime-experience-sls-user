import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule, PrismaService } from '../../common/database';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { CreateAuthDto } from './dto/create-auth.dto';

jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
}));

describe('UserService', () => {
  let service: AuthService;
  let prisma: PrismaService;
  let jwt: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [AuthService, JwtService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
    jwt = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  });

  describe('authenticateUser', () => {
    it('should auth a user', async () => {
      prisma.user.findFirst = jest
        .fn()
        .mockResolvedValueOnce({ id: '1', password: '12345' });
      jwt.sign = jest.fn().mockResolvedValueOnce('token');
      (compare as jest.Mock).mockResolvedValueOnce(true);

      const createSessionDto = {
        email: 'gui.luiz@gmail.com',
        password: '12345',
      } as CreateAuthDto;
      const result = await service.authenticateUser(createSessionDto);

      expect(await result.token).toBe('token');
    });

    it('should fail by user not found', async () => {
      prisma.user.findFirst = jest.fn().mockResolvedValueOnce(null);
      jwt.sign = jest.fn().mockResolvedValueOnce('token');
      (compare as jest.Mock).mockResolvedValueOnce(false);

      const createSessionDto = {
        email: 'gui.luiz@gmail.com',
        password: '12345',
      } as CreateAuthDto;

      expect(service.authenticateUser(createSessionDto)).rejects.toThrowError();
    });

    it('should fail by user invalid pass', async () => {
      prisma.user.findFirst = jest
        .fn()
        .mockResolvedValueOnce({ id: '1', password: '12345' });
      jwt.sign = jest.fn().mockResolvedValueOnce('token');
      (compare as jest.Mock).mockResolvedValueOnce(false);

      const createSessionDto = {
        email: 'gui.luiz@gmail.com',
        password: '12345',
      } as CreateAuthDto;

      expect(service.authenticateUser(createSessionDto)).rejects.toThrowError();
    });
  });
});
