import type { NewsApiResponse } from "../../domain/entities/Article";
import type { NewsRepository } from "../../domain/repositories/NewsRepository";

export class NewsApiRepository implements NewsRepository {
  private apiUrl: string;
  private apiKey: string;
  private page: number = 1;
  private search: string = "apple";

  constructor(
    apiUrl: string,
    apiKey: string,
    page: number = 1,
    search = "apple"
  ) {
    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
    this.page = page;
    this.search = search;
  }

  async fetchPopularNews(): Promise<NewsApiResponse> {
    const url = `${this.apiUrl}/everything?q=${this.search}&from=2025-06-23&to=2025-06-23&sortBy=popularity&pageSize=20&page=${this.page}&apiKey=${this.apiKey}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch news");
    }

    const data = (await response.json()) as NewsApiResponse;
    return data ?? { status: "error", totalResults: 0, articles: [] };
  }
}
