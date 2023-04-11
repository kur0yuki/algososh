/// <reference types="cypress" />

import {BASE_URL, FIBO} from "./constants";
import {CIRCLE_CIRCLE} from "./selectors";

describe('Fibonacci tests', function () {
    beforeEach("Can access", () => {
        cy.visit(`${BASE_URL}${FIBO}`);
    })
    it("Button is disabled when empty", () => {
        cy.contains("Рассчитать").as('button')
        cy.get('@button').should('be.disabled')
        cy.get('input').type("3")
        cy.get('@button').should('not.be.disabled')
    })

    it('Fibbonacci numbers are computed correctly', () => {
        cy.contains("Рассчитать").as('button')
        cy.get('input').type("7")
        cy.get('@button').click()

        cy.wait(8000)

        cy.get(CIRCLE_CIRCLE).as('circles')
        cy.get('@circles').each(($el, idx) => {
            //cy.wrap($el).contains('p[class*="circle_letter"]').as(`letter_${idx}`)
            switch(idx) {
                case 0: cy.wrap($el).contains(1); break
                case 1: cy.wrap($el).contains(1); break
                case 2: cy.wrap($el).contains(2); break
                case 3: cy.wrap($el).contains(3); break
                case 4: cy.wrap($el).contains(5); break
                case 5: cy.wrap($el).contains(8); break
                case 6: cy.wrap($el).contains(13); break
                case 7: cy.wrap($el).contains(21); break
            }
        })
    })
})