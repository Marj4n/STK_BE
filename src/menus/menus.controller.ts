import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
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
  @ApiParam({ name: 'id', type: Number })
  findOne(@Param('id', ParseIntPipe) id: number) {
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
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateMenuDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateMenuDto) {
    return this.menusService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a menu' })
  @ApiParam({ name: 'id', type: Number })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.menusService.remove(id);
  }

  @Patch(':id/move')
  @ApiOperation({ summary: 'Move a menu under another parent' })
  move(
    @Param('id', ParseIntPipe) id: number,
    @Body('parentId') parentId: number | null,
  ) {
    return this.menusService.move(id, parentId);
  }

  @Patch(':id/reorder')
  @ApiOperation({ summary: 'Reorder a menu position' })
  reorder(@Param('id', ParseIntPipe) id: number, @Body('order') order: number) {
    return this.menusService.reorder(id, order);
  }
}
