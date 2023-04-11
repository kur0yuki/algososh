/// <reference types="cypress" />

import {BASE_URL} from "./constants";

describe('App is available', function() {
    it("Can access", () => {
        cy.visit(BASE_URL);
    })
})