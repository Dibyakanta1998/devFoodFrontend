import { act } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import "@testing-library/jest-dom";

import MOCK_DATA from "../mocks/restaurantListMock.json";
import Body from "../Body";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(MOCK_DATA);
    },
  });
});

it("Should search rest list for ice text input", async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    )
  );

  const cardsBeforeSearch = screen.getAllByTestId("resCard");
  expect(cardsBeforeSearch.length).toBe(20);
  const searchButton = screen.getByRole("button", { name: "Search" });
  const searchInput = screen.getByTestId("searchInput");
  fireEvent.change(searchInput, {
    target: {
      value: "ice",
    },
  });
  fireEvent.click(searchButton);

  const restroCards = screen.getAllByTestId("resCard");
  expect(restroCards.length).toBe(2);
});

it("Should filter top rated restaurant", async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    )
  );

  const beforeFilterRestroCards = screen.getAllByTestId("resCard");
  expect(beforeFilterRestroCards.length).toBe(20);

  const topRatedButton = screen.getByRole("button", {
    name: "Top Rated Restaurants",
  });

  fireEvent.click(topRatedButton);

  const afterFilteredRestroCards = screen.getAllByTestId("resCard");
  expect(afterFilteredRestroCards.length).toBe(8);
});
