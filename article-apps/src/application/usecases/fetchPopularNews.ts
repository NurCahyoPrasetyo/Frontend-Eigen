import type { Article } from "../../domain/entities/Article";
import type { NewsRepository } from "../../domain/repositories/NewsRepository";

export class FetchPopularNews {
  private repo: NewsRepository;

  constructor(repo: NewsRepository) {
    this.repo = repo;
  }

  async execute(): Promise<Article[]> {
    return await this.repo.fetchPopularNews();
  }
}
