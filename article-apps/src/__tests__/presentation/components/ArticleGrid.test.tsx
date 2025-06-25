import { fireEvent, render, screen } from "@testing-library/react";
import { Article } from "../../../domain/entities/Article";
import ArticleGrid from "../../../presentation/components/molecules/ArticleGrid";

const mockArticle: Article = {
  source: { id: "1", name: "Test Source" },
  author: "Author",
  title: "Test Title",
  description: "Description",
  url: "https://example.com",
  urlToImage: "",
  publishedAt: "2024-01-01",
  content: "Content",
};

describe("ArticleGrid", () => {
  it("renders article cards", () => {
    const handleClick = jest.fn();
    render(
      <ArticleGrid articles={[mockArticle]} onArticleClick={handleClick} />
    );
    expect(screen.getByText("Test Title")).toBeInTheDocument();

    const card = screen.getByText("Test Title").closest(".ant-card");
    fireEvent.click(card!);
    expect(handleClick).toHaveBeenCalled();
  });
});
