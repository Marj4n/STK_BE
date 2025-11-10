import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from 'prisma/generated/prisma';

export type MenuWithChildren = Menu & {
  parentNames?: string | null;
  children?: MenuWithChildren[];
};

@Injectable()
export class MenusService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<MenuWithChildren[]> {
    const topMenus = await this.prisma.menu.findMany({
      where: { parentId: null },
      orderBy: { order: 'asc' },
    });

    const menusWithChildren = await Promise.all(
      topMenus.map((m) => this.findOne(m.id)),
    );

    return menusWithChildren;
  }

  async findOne(id: string): Promise<MenuWithChildren> {
    const menu = await this.prisma.menu.findUnique({ where: { id } });
    if (!menu) throw new NotFoundException('Menu not found');

    let parentNames: string | null = null;
    if (menu.parentId) {
      const parent = await this.prisma.menu.findUnique({
        where: { id: menu.parentId },
        select: { name: true },
      });
      if (parent) parentNames = parent.name;
    }

    const children = await this.prisma.menu.findMany({
      where: { parentId: id },
      orderBy: { order: 'asc' },
    });

    const childrenWithSub: MenuWithChildren[] = await Promise.all(
      children.map((c) => this.findOne(c.id)),
    );

    return { ...menu, parentNames, children: childrenWithSub };
  }

  async create(dto: CreateMenuDto): Promise<Menu> {
    return this.prisma.menu.create({ data: dto });
  }

  async update(id: string, dto: UpdateMenuDto): Promise<Menu> {
    await this.findOne(id);
    return this.prisma.menu.update({ where: { id }, data: dto });
  }

  async remove(id: string): Promise<Menu> {
    await this.findOne(id);
    return this.prisma.menu.delete({ where: { id } });
  }

  async move(id: string, newParentId: string | null): Promise<Menu> {
    return this.prisma.menu.update({
      where: { id },
      data: { parentId: newParentId },
    });
  }

  async reorder(
    id: string,
    targetIndex: number,
    newParentId?: string | null,
  ): Promise<MenuWithChildren[]> {
    const menu = await this.prisma.menu.findUnique({ where: { id } });
    if (!menu) throw new NotFoundException('Menu not found');

    const parentId = newParentId ?? menu.parentId ?? null;

    const siblings = await this.prisma.menu.findMany({
      where: { parentId },
      orderBy: { order: 'asc' },
    });

    const others = siblings.filter((s) => s.id !== id);
    others.splice(targetIndex, 0, menu);

    await Promise.all(
      others.map((s, i) =>
        this.prisma.menu.update({
          where: { id: s.id },
          data: { order: i + 1, parentId },
        }),
      ),
    );

    return this.findAll();
  }
}
