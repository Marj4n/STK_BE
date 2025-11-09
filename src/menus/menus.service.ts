import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Injectable()
export class MenusService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.menu.findMany({
      where: { parentId: null },
      include: { children: true },
      orderBy: { order: 'asc' },
    });
  }

  async findOne(id: number) {
    const menu = await this.prisma.menu.findUnique({
      where: { id },
      include: { children: true },
    });
    if (!menu) throw new NotFoundException('Menu not found');
    return menu;
  }

  async create(dto: CreateMenuDto) {
    return this.prisma.menu.create({ data: dto });
  }

  async update(id: number, dto: UpdateMenuDto) {
    await this.findOne(id);
    return this.prisma.menu.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.menu.delete({ where: { id } });
  }

  async move(id: number, newParentId: number | null) {
    return this.prisma.menu.update({
      where: { id },
      data: { parentId: newParentId },
    });
  }

  async reorder(id: number, newOrder: number) {
    return this.prisma.menu.update({
      where: { id },
      data: { order: newOrder },
    });
  }
}
