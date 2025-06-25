import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DetailPage from "../../../presentation/pages/DetailPage";

// Mock navigate
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("DetailPage", () => {
  beforeEach(() => {
    const mockArticle = {
      title: "Test Title",
      content: "Test Content",
      description: "Test Description",
      author: "Test Author",
      url: "https://example.com",
      publishedAt: "2023-01-01T12:00:00Z",
      urlToImage: "",
      source: { id: "1", name: "Test Source" },
    };
    localStorage.setItem("articleDetail", JSON.stringify(mockArticle));
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("renders article details and allows navigation", () => {
    render(
      <MemoryRouter>
        <DetailPage />
      </MemoryRouter>
    );

    expect(screen.getByText("BACK TO HOME")).toBeInTheDocument();
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText("Test Source")).toBeInTheDocument();

    fireEvent.click(screen.getByText("BACK TO HOME"));
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("opens external link when 'READ MORE' is clicked", () => {
    window.open = jest.fn(); // mock window.open

    render(
      <MemoryRouter>
        <DetailPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("READ MORE"));
    expect(window.open).toHaveBeenCalledWith("https://example.com", "_blank");
  });
});
