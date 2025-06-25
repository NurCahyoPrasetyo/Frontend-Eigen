import { render, screen } from "@testing-library/react";
import type { Article } from "../../../domain/entities/Article";
import ArticleDetail from "../../../presentation/components/molecules/ArticleDetail";

const mockArticle: Article = {
  title: "Test Title",
  content: "Test Content",
  description: "Test Description",
  urlToImage: "",
  source: { id: "1", name: "Test Source" },
  author: "Test Author",
  publishedAt: "2025-06-25T08:00:00Z",
  url: "https://example.com",
};

describe("ArticleDetail", () => {
  it("renders article details correctly", () => {
    render(<ArticleDetail article={mockArticle} />);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Author")).toBeInTheDocument();
    expect(screen.getByText("Test Source")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });
});
