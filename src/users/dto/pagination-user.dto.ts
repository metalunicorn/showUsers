import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({ default: 1, required: false })
  page: number;
  @ApiProperty({ default: 5, required: false })
  limit: number;
}
