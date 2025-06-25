import { GetArticleDetailFromStorage } from "../../../application/usecases/GetArticleDetailFromStorage";
import type { Article } from "../../../domain/entities/Article";

describe("GetArticleDetailFromStorage", () => {
  it("returns parsed article from localStorage", () => {
    const mockArticle: Article = {
      title: "Mock Title",
      content: "Mock Content",
      urlToImage: "",
      source: { id: "1", name: "Mock Source" },
      author: "Mock Author",
      publishedAt: "2025-06-25T10:00:00Z",
      description: "Mock Description",
      url: "https://mock.com",
    };

    localStorage.setItem("articleDetail", JSON.stringify(mockArticle));

    const result = GetArticleDetailFromStorage();
    expect(result).toEqual(mockArticle);
  });

  it("returns null if localStorage is empty", () => {
    localStorage.removeItem("articleDetail");
    const result = GetArticleDetailFromStorage();
    expect(result).toBeNull();
  });
});
