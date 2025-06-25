import { fireEvent, render, screen } from "@testing-library/react";
import ArticleSearch from "../../../presentation/components/molecules/ArticleSearch";

describe("ArticleSearch", () => {
  it("renders input and triggers onSearch", () => {
    const handleSearch = jest.fn();

    render(<ArticleSearch loading={false} onSearch={handleSearch} />);

    const input = screen.getByRole("searchbox");
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "apple" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
  });
});
