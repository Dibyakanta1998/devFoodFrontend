import { render, screen } from "@testing-library/react";
import RestaurantCard, { withPromtedLabel } from "../RestaurantCard";
import MOCK_DATA from "../mocks/restaurantCardMock.json";
import "@testing-library/jest-dom";

it("should render RestaurantCard component with props Data", () => {
  render(<RestaurantCard {...MOCK_DATA} />);
  const name = screen.getByText("KFC");

  expect(name).toBeInTheDocument();
});

it("should render With Label RestaurantCard component with props Data", () => {
  const RestaurantCardPromoted = withPromtedLabel(RestaurantCard);

  render(<RestaurantCardPromoted {...MOCK_DATA} />);
  const name = screen.getByText("Promoted");

  expect(name).toBeInTheDocument();
});
