import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '../../common/database/prisma.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';

describe('UserController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [AuthController],
      providers: [AuthService, JwtService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a auth', async () => {
      jest
        .spyOn(service, 'authenticateUser')
        .mockResolvedValueOnce({ user: { id: '1' } } as any);
      const createAuthDto = {
        email: 'gui.luizlange@gmail.com',
        password: '12345',
      } as CreateAuthDto;

      const result = await controller.create(createAuthDto);

      expect(result.user.id).toEqual('1');
      expect(service.authenticateUser).toBeCalledTimes(1);
    });
  });
});
