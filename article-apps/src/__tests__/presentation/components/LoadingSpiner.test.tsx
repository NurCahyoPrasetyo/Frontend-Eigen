import { render, screen } from "@testing-library/react";
import LoadingSpiner from "../../../presentation/components/atoms/LoadingSpiner";

describe("LoadingSpiner", () => {
  it("renders spinner when isShow is true", () => {
    render(<LoadingSpiner isShow={true} />);
    const spinner = screen.getByTestId("spinner");
    expect(spinner).toBeInTheDocument();
  });

  it("does not render when isShow is false", () => {
    const { queryByTestId } = render(<LoadingSpiner isShow={false} />);
    expect(queryByTestId("spinner")).toBeNull();
  });
});
