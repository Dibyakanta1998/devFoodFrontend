import Contact from "../Contact";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

//it and test both are same
describe("Contact us page test cases", () => {
  it("Should load contact us component", () => {
    render(<Contact />);
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
  });

  test("Should load button inside contact component", () => {
    render(<Contact />);
    const button = screen.getByRole("button");
    // const button = screen.getByText("Submit");

    expect(button).toBeInTheDocument();
  });

  test("Should load input inside contact component", () => {
    render(<Contact />);
    const input = screen.getByPlaceholderText("name");

    expect(input).toBeInTheDocument();
  });
});

test("Should load two input inside contact component", () => {
  render(<Contact />);
  const inputBoxes = screen.getAllByRole("textbox");

  expect(inputBoxes.length).toBe(2);
});
