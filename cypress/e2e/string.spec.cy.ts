/// <reference types="cypress" />

import {BASE_URL, STRING} from "./constants";
import {ElementStates} from "../../src/types/element-states";

describe('String tests', function () {
    beforeEach("Can access", () => {
        cy.visit(`${BASE_URL}${STRING}`);
    })
    it("Button is disabled when empty", () => {
        cy.contains("Развернуть").as('button')
        cy.get('@button').should('be.disabled')
        cy.get('input').type("hello")
        cy.get('@button').should('not.be.disabled')
    })

    it('String reverses correctly', () => {
        cy.contains("Развернуть").as('button')
        cy.get('@button').should('be.disabled')
        cy.get('input').type("hello")
        cy.get('@button').should('not.be.disabled')
        cy.get('@button').click()

        cy.get('div[class*="circle_circle"]').as('circles')

        cy.get('@circles').each(($el, idx) => {
            idx == 0 || idx == 4 ? cy.wrap($el).should(($el) =>
                    expect($el[0].className).to.match(new RegExp(`${ElementStates.Changing}`))) :
                cy.wrap($el).should(($el) =>
                    expect($el[0].className).to.match(new RegExp(`${ElementStates.Default}`)))
        })

        //cy.wait(500)

        cy.get('@circles').each(($el, idx) => {
            switch (idx) {
                case 1:
                case 3:
                    cy.wrap($el).should(($el) =>
                        expect($el[0].className).to.match(new RegExp(`${ElementStates.Changing}`)))
                    break
                case 0:
                case 4:
                    cy.wrap($el).should(($el) =>
                        expect($el[0].className).to.match(new RegExp(`${ElementStates.Modified}`)))
                    break
                case 2:
                    cy.wrap($el).should(($el) =>
                        expect($el[0].className).to.match(new RegExp(`${ElementStates.Default}`)))
            }
        })

        //cy.wait(1000)
        cy.get('@circles').each(($el, idx) => {
            switch (idx) {
                case 2:
                    cy.wrap($el).should(($el) =>
                        expect($el[0].className).to.match(new RegExp(`${ElementStates.Changing}`)))
                    break
                case 0:
                case 1:
                case 3:
                case 4:
                    cy.wrap($el).should(($el) =>
                        expect($el[0].className).to.match(new RegExp(`${ElementStates.Modified}`)))
                    break
            }
        })

        cy.get('@circles').each(($el) => {
                    cy.wrap($el).should(($el) =>
                        expect($el[0].className).to.match(new RegExp(`${ElementStates.Modified}`)))
        })

    })
})