import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuDto } from './create-menu.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateMenuDto extends PartialType(CreateMenuDto) {
  @ApiPropertyOptional({ example: 'Updated Menu Name' })
  name?: string;

  @ApiPropertyOptional({ example: '56320ee9-6af6-11ed-a7ba-f220afe5e4a9' })
  parentId?: string;
}
