import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import AppLayout from "../../../presentation/components/layout/AppLayout";

describe("AppLayout", () => {
  it("renders header, footer, and outlet", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<div>Mocked Page</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText("Home")).toBeInTheDocument();
    expect(await screen.findByText(/Ant Design ©/)).toBeInTheDocument();
    expect(await screen.findByText("Mocked Page")).toBeInTheDocument();
  });
});
