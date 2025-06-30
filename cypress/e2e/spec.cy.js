describe("thema app", () => {
  // Test, if a booking can be created and is shown
  // in the side bar.
  // A test production is created first, for this purpose.
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("can create new booking", () => {
    let productionId;
    // create a test production first
    cy.request({
      method: "POST",
      url: "http://127.0.0.1:8000/productions/",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        name: "cy_test_production",
        season: 1, // TODO make this safe
        ensemble: 1,
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      productionId = response.body.id;
    });
    cy.contains("Bookings").click();
    cy.contains("Neues Booking").click();
    cy.get("[data-cy='production-select']").select("cy_test_production");
    cy.contains("Speichern").click();
    cy.get("[data-cy='booking-list']")
      .contains("li", "cy_test_production")
      .should("exist")
      .invoke("attr", "data-cy")
      .then((bookingId) => {
        cy.request("DELETE", `http://localhost:8000/bookings/${bookingId}/`);
        cy.request(
          "DELETE",
          `http://localhost:8000/productions/${productionId}/`
        );
      });
  });
});
