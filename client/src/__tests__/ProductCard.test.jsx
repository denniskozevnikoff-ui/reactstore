// client/src/__tests__/ProductCard.test.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "../components/ProductCard";

const mockProduct = {
  _id: "123",
  name: "Test Product",
  price: 49.99,
  imageUrl: "https://example.com/image.jpg",
};

describe("ProductCard component", () => {
  test("renders product name, price and image", () => {
    render(
      <ProductCard
        product={mockProduct}
        addToCart={jest.fn()}
        onSelectProduct={jest.fn()}
      />
    );

    // Name
    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();

    // Price formatted with $
    expect(screen.getByText("$49.99")).toBeInTheDocument();

    // Image alt
    const img = screen.getByAltText(/Test Product/i);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", mockProduct.imageUrl);
  });

  test("calls addToCart when Add to Cart button is clicked", () => {
    const addToCart = jest.fn();

    const { container } = render(
      <ProductCard
        product={mockProduct}
        addToCart={addToCart}
        onSelectProduct={jest.fn()}
      />
    );

    const addButton = container.querySelector(".btn-add-cart");
    expect(addButton).not.toBeNull();

    fireEvent.click(addButton);

    expect(addToCart).toHaveBeenCalledTimes(1);
    expect(addToCart).toHaveBeenCalledWith(mockProduct);
  });

  test("calls onSelectProduct when View Details button is clicked", () => {
    const onSelectProduct = jest.fn();

    const { container } = render(
      <ProductCard
        product={mockProduct}
        addToCart={jest.fn()}
        onSelectProduct={onSelectProduct}
      />
    );

    const detailsButton = container.querySelector(".btn-view-details");
    expect(detailsButton).not.toBeNull();

    fireEvent.click(detailsButton);

    expect(onSelectProduct).toHaveBeenCalledTimes(1);
    expect(onSelectProduct).toHaveBeenCalledWith(mockProduct);
  });

  test("does not render View Details button when onSelectProduct is not provided", () => {
    const { container } = render(
      <ProductCard product={mockProduct} addToCart={jest.fn()} />
    );

    const detailsButton = container.querySelector(".btn-view-details");
    expect(detailsButton).toBeNull();
  });
});
