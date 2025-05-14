import Contact from "../Contact";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Contact us page test cases", () => {
  // beforeAll(() => {
  //   console.log("before All");
  // });

  // beforeEach(() => {
  //   console.log("before Each");
  // });

  // afterAll(() => {
  //   console.log("after All");
  // });

  // afterEach(() => {
  //   console.log("after Each");
  // });

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
