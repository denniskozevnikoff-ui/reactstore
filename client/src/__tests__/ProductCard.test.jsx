// src/__tests__/ProductCard.test.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "../components/ProductCard";

describe("ProductCard component", () => {
  const product = {
    _id: "123",
    name: "PC gamer",
    price: 500,
    description: "Powerful pc gamer ready to install and play",
    imageUrl: "http://localhost:5000/images/pc.jpeg",
  };

  test("renders product name and price", () => {
    render(
      <ProductCard
        product={product}
        addToCart={() => {}}
        onSelectProduct={() => {}}
      />
    );

    // Name
    expect(screen.getByText(/pc gamer/i)).toBeInTheDocument();

    // Price: matches "500", "$500" or "$ 500"
    expect(screen.getByText(/\$?\s*500/)).toBeInTheDocument();

    // If in the future you show the description in the UI, you can
    // uncomment this line:
    //
    // expect(
    //   screen.getByText(/powerful pc gamer ready to install and play/i)
    // ).toBeInTheDocument();
  });

  test("calls addToCart when 'Add to Cart' button is clicked", () => {
    const addToCartMock = jest.fn();

    render(
      <ProductCard
        product={product}
        addToCart={addToCartMock}
        onSelectProduct={() => {}}
      />
    );

    fireEvent.click(
      screen.getByRole("button", { name: /add to cart/i })
    );

    expect(addToCartMock).toHaveBeenCalledTimes(1);
    expect(addToCartMock).toHaveBeenCalledWith(product);
  });
});
