import React from "react";
import { screen, render } from "@testing-library/react";
import Home from "./Home";

let wrapper;
beforeEach(() => {
  const { getByTestId } = render(<Home />);
  wrapper = getByTestId("navbar");
});

test("test navbar", () => {
  expect(wrapper).toBeInTheDocument();
});

test("Test title ABC Bank", () => {
  const wrapper = screen.getByText(/TRADING APP/);
  expect(wrapper).toBeInTheDocument();
  expect(wrapper).toMatchSnapshot();
});


