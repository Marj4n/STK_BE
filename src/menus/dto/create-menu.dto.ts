import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { z } from 'zod';

export const CreateMenuSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  parentId: z.number().optional(),
  order: z.number().optional(),
});

export class CreateMenuDto {
  @ApiProperty({ example: 'Dashboard', description: 'Menu name' })
  name: string;

  @ApiPropertyOptional({ example: 1, description: 'Parent menu ID (optional)' })
  parentId?: number;

  @ApiPropertyOptional({
    example: 2,
    description: 'Order in the list (optional)',
  })
  order?: number;
}

export type CreateMenuZod = z.infer<typeof CreateMenuSchema>;
