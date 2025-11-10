import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { z } from 'zod';

export const CreateMenuSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  parentId: z.string().uuid().optional(),
  order: z.number().optional(),
});

export class CreateMenuDto {
  @ApiProperty({ example: 'Dashboard', description: 'Menu name' })
  name: string;

  @ApiPropertyOptional({
    example: '56320ee9-6af6-11ed-a7ba-f220afe5e4a9',
    description: 'Parent menu ID (UUID, optional)',
  })
  parentId?: string;

  @ApiPropertyOptional({
    example: 2,
    description: 'Order in the list (optional)',
  })
  order?: number;
}

export type CreateMenuZod = z.infer<typeof CreateMenuSchema>;
