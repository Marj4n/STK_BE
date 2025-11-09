import { Test, TestingModule } from '@nestjs/testing';
import { MenusService } from './menus.service';
import { PrismaService } from '../prisma/prisma.service';

describe('MenusService', () => {
  let service: MenusService;

  const mockPrisma = {
    menu: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MenusService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<MenusService>(MenusService);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call prisma.menu.findMany when findAll is called', async () => {
    mockPrisma.menu.findMany.mockResolvedValue([]);
    await service.findAll();
    expect(mockPrisma.menu.findMany).toHaveBeenCalled();
  });

  it('should call prisma.menu.create when create is called', async () => {
    const dto = { name: 'New Menu' };
    mockPrisma.menu.create.mockResolvedValue(dto);
    await service.create(dto);
    expect(mockPrisma.menu.create).toHaveBeenCalledWith({ data: dto });
  });
});
