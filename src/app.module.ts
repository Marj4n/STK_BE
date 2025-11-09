import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { MenusController } from './menus/menus.controller';
import { MenusService } from './menus/menus.service';

@Module({
  imports: [PrismaModule],
  controllers: [MenusController],
  providers: [MenusService],
})
export class AppModule {}
