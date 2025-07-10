export interface ApiResponse<T> {
  data: T;
  pagination?: {
    total: number;
    offset: number;
    limit: number;
    next_offset: number;
  };
}
