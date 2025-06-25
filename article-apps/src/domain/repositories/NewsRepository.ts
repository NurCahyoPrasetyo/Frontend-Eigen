import type { NewsApiResponse } from "../entities/Article";

export interface NewsRepository {
  fetchPopularNews(): Promise<NewsApiResponse>;
}
