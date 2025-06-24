import type { Article } from "../entities/Article";

export interface NewsRepository {
  fetchPopularNews(): Promise<Article[]>;
}
