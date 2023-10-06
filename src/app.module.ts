import { Module } from '@nestjs/common';
import { UserModule } from './models/user/user.module';
import { PrismaModule } from './common/database';
import { AuthModule } from './models/authentication/auth.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
