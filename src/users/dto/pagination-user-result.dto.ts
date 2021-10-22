import { User } from '../entities/user.entity';

export class PaginatedUserResultDto {
  data: User[];
  page: number;
  limit: number;
  totalCount: number;
}
