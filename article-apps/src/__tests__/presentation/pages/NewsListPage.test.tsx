import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NewsListPage from "../../../presentation/pages/NewsListPage";

jest.mock("../../../config/env", () => ({
  __esModule: true,
  default: {
    apiUrl: "mock_url",
    apiKey: "mock_key",
  },
}));

const mockExecute = jest.fn().mockResolvedValue({
  articles: [
    {
      title: "Test Article",
      content: "Test Content",
      urlToImage: "",
      source: { id: "1", name: "Test Source" },
    },
  ],
  totalResults: 1,
});

jest.mock("../../../application/usecases/fetchPopularNews", () => ({
  FetchPopularNews: jest.fn().mockImplementation(() => ({
    execute: mockExecute,
  })),
}));

jest.mock("../../../infrastructure/api/NewsApiRepository", () => ({
  NewsApiRepository: jest.fn().mockImplementation(() => ({})),
}));

describe("NewsListPage", () => {
  it("renders article data", async () => {
    render(
      <BrowserRouter>
        <NewsListPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      // screen.debug(); // uncomment to check DOM output
      expect(screen.getByText("Test Article")).toBeInTheDocument();
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });
  });
});
