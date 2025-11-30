// src/App.test.js
import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders App component without crashing", () => {
  render(<App />);
  // If render completes without throwing an error, the test passes.
});
