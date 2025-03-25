export interface Page<T> {
  href: string;
  limit: number;
  offset: number;
  next: string;
  previous: string;
  total: number;
  items: Array<T>;
}
