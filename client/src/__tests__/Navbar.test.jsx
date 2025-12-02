// src/__tests__/Navbar.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import Navbar from "../components/Navbar";

describe("Navbar component", () => {
  test("renders the store title", () => {
    // Adjust props if your Navbar expects something different
    render(<Navbar cartCount={0} onNavigate={() => {}} />);

    // Logo text in the navbar
    expect(screen.getByText(/reactstore/i)).toBeInTheDocument();
  });

  test("shows Home, Cart, Login and Sign Up buttons", () => {
    render(<Navbar cartCount={0} onNavigate={() => {}} />);

    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/cart/i)).toBeInTheDocument();
    expect(screen.getByText(/login/i)).toBeInTheDocument();
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });
});

