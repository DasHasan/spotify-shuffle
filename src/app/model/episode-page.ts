import {Episode} from './episode';

export interface EpisodePage {
  href?: string;
  limit?: number;
  next?: string;
  offset?: number;
  previous?: string;
  total?: number;
  items?: Episode[];
}
