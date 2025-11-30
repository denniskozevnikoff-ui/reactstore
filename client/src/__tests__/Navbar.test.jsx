// client/src/__tests__/Navbar.test.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "../components/Navbar";

describe("Navbar component", () => {
  test("renders logo and main buttons", () => {
    render(
      <Navbar
        onHome={jest.fn()}
        onCart={jest.fn()}
        onLogin={jest.fn()}
        onSignUp={jest.fn()}
        onLogout={jest.fn()}
        isLoggedIn={false}
      />
    );

    // Logo
    expect(screen.getByText(/ReactStore/i)).toBeInTheDocument();

    // Main buttons
    expect(screen.getByRole("button", { name: /Home/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Cart/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Sign Up/i })).toBeInTheDocument();
  });

  test("calls handlers when buttons are clicked", () => {
    const onHome = jest.fn();
    const onCart = jest.fn();
    const onLogin = jest.fn();
    const onSignUp = jest.fn();

    render(
      <Navbar
        onHome={onHome}
        onCart={onCart}
        onLogin={onLogin}
        onSignUp={onSignUp}
        onLogout={jest.fn()}
        isLoggedIn={false}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Home/i }));
    fireEvent.click(screen.getByRole("button", { name: /Cart/i }));
    fireEvent.click(screen.getByRole("button", { name: /Login/i }));
    fireEvent.click(screen.getByRole("button", { name: /Sign Up/i }));

    expect(onHome).toHaveBeenCalledTimes(1);
    expect(onCart).toHaveBeenCalledTimes(1);
    expect(onLogin).toHaveBeenCalledTimes(1);
    expect(onSignUp).toHaveBeenCalledTimes(1);
  });

  test("shows Logout button when logged in", () => {
    render(
      <Navbar
        onHome={jest.fn()}
        onCart={jest.fn()}
        onLogin={jest.fn()}
        onSignUp={jest.fn()}
        onLogout={jest.fn()}
        isLoggedIn={true}
      />
    );

    expect(screen.getByRole("button", { name: /Logout/i })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Login/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Sign Up/i })).not.toBeInTheDocument();
  });
});
