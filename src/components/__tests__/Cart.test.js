import { render, screen, fireEvent, act } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import RestaurantMenu from "../RestaurantMenu";
import MOCK_DATA from "../mocks/restaurantMenuMock.json";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import Header from "../Header";
import Cart from "../Cart";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(MOCK_DATA),
  })
);

it("Should load Restaurant menu component and allow toggling category", async () => {
  await act(async () => {
    render(
      <Provider store={appStore}>
        <MemoryRouter initialEntries={["/restaurant/847264"]}>
          <Header />
          <Routes>
            <Route path="/restaurant/:resId" element={<RestaurantMenu />} />
          </Routes>
          <Cart />
        </MemoryRouter>
      </Provider>
    );
  });

  const accordionHeader = await screen.findByText("Cups(4)");
  expect(accordionHeader).toBeInTheDocument();

  fireEvent.click(accordionHeader);
  expect(screen.getByText("Cups(4)")).toBeInTheDocument();

  const foodItems = screen.getAllByTestId("foodItems");

  expect(foodItems.length).toBe(4);

  const addButtons = screen.getAllByRole("button", { name: "Add +" });

  fireEvent.click(addButtons[0]);

  expect(screen.getByText("Cart - 1")).toBeInTheDocument();

  fireEvent.click(addButtons[1]);

  expect(screen.getByText("Cart - 2")).toBeInTheDocument();

  const cartCards = screen.getAllByTestId("foodItems");

  expect(cartCards.length).toBe(6);

  fireEvent.click(screen.getByRole("button", { name: "Clear Cart" }));

  expect(screen.getAllByTestId("foodItems").length).toBe(4);
});
