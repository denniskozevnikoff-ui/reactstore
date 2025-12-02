// src/App.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the Electronic Store header", () => {
  render(<App />);

  // This matches the <h2>Electronic Store</h2> in App's header
  expect(screen.getByText(/electronic store/i)).toBeInTheDocument();
});

