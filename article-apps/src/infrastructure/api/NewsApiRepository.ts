import type { Article } from "../../domain/entities/Article";
import type { NewsRepository } from "../../domain/repositories/NewsRepository";

export class NewsApiRepository implements NewsRepository {
  private apiUrl: string;
  private apiKey: string;

  constructor(apiUrl: string, apiKey: string) {
    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
  }

  async fetchPopularNews(): Promise<Article[]> {
    const url = `${this.apiUrl}/everything?q=apple&from=2025-06-23&to=2025-06-23&sortBy=popularity&pageSize=20&page=1&apiKey=${this.apiKey}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch news");
    }

    const data = await response.json();
    return data.articles || [];
  }
}
