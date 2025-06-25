import { FetchPopularNews } from "../../../application/usecases/fetchPopularNews";
import { NewsRepository } from "../../../domain/repositories/NewsRepository";

describe("FetchPopularNews", () => {
  it("should call fetchPopularNews from repository", async () => {
    const mockData = {
      articles: [],
      totalResults: 0,
    };

    const mockRepo: NewsRepository = {
      fetchPopularNews: jest.fn().mockResolvedValue(mockData),
    };

    const usecase = new FetchPopularNews(mockRepo);

    const result = await usecase.execute();

    expect(mockRepo.fetchPopularNews).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockData);
  });
});
