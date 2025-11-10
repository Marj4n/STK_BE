import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('menus')
@Controller('api/menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Get()
  @ApiOperation({ summary: 'Get all top-level menus' })
  @ApiResponse({ status: 200, description: 'Return all menus' })
  findAll() {
    return this.menusService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a menu by ID' })
  @ApiParam({
    name: 'id',
    type: String,
    example: '56320ee9-6af6-11ed-a7ba-f220afe5e4a9',
  })
  findOne(@Param('id') id: string) {
    return this.menusService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new menu' })
  @ApiBody({ type: CreateMenuDto })
  create(@Body() dto: CreateMenuDto) {
    return this.menusService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a menu' })
  @ApiParam({
    name: 'id',
    type: String,
    example: '56320ee9-6af6-11ed-a7ba-f220afe5e4a9',
  })
  @ApiBody({ type: UpdateMenuDto })
  update(@Param('id') id: string, @Body() dto: UpdateMenuDto) {
    return this.menusService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a menu' })
  @ApiParam({
    name: 'id',
    type: String,
    example: '56320ee9-6af6-11ed-a7ba-f220afe5e4a9',
  })
  remove(@Param('id') id: string) {
    return this.menusService.remove(id);
  }

  @Patch(':id/move')
  @ApiOperation({ summary: 'Move a menu under another parent' })
  @ApiParam({
    name: 'id',
    type: String,
    example: '56320ee9-6af6-11ed-a7ba-f220afe5e4a9',
  })
  move(@Param('id') id: string, @Body('parentId') parentId?: string | null) {
    return this.menusService.move(id, parentId ?? null);
  }

  @Patch(':id/reorder')
  @ApiOperation({
    summary: 'Reorder a menu position, optionally change parent',
  })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        targetIndex: { type: 'number' },
        newParentId: { type: 'string', nullable: true },
      },
    },
  })
  reorder(
    @Param('id') id: string,
    @Body() body: { targetIndex: number; newParentId?: string | null },
  ) {
    return this.menusService.reorder(
      id,
      body.targetIndex,
      body.newParentId ?? null,
    );
  }
}
