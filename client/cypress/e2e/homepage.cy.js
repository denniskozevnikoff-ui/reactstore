describe("Homepage E2E Test", () => {
  it("opens product details when clicking View Details", () => {
    cy.visit("http://localhost:3000/");

    cy.get(".btn-view-details").first().click();

    // Confirm product title appears
    cy.contains(/pc gamer/i).should("be.visible");

    // Confirm product description appears
    cy.contains(/powerful pc gamer ready to install and play/i)
      .should("be.visible");

    // Confirm price is visible
    cy.contains(/\$500/i).should("be.visible");

    // Confirm Add to Cart button is visible
    cy.get("button").contains(/add to cart/i).should("be.visible");
  });
});
