import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from '../../common/database/prisma.module';
import { CreateUserDto } from './dto/create-user.dto';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      jest.spyOn(service, 'create').mockResolvedValueOnce({ id: '1' } as any);
      const createUserDto = {
        email: 'gui.luizlange@gmail.com',
        name: 'Guilherme',
        password: '12345',
      } as CreateUserDto;

      const result = await controller.create(createUserDto);

      expect(result.id).toEqual('1');
      expect(service.create).toBeCalledTimes(1);
      expect(service.create).toHaveBeenCalledWith(createUserDto);
    });
  });
});
