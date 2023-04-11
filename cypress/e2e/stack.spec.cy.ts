/// <reference types="cypress" />

import {BASE_URL, STACK} from "./constants";
import {ElementStates} from "../../src/types/element-states";
import {CIRCLE_CIRCLE} from "./selectors";

describe('Stack tests', function () {
    beforeEach("Can access", () => {
        cy.visit(`${BASE_URL}${STACK}`);
    })
    it("Button is disabled when empty", () => {
        cy.contains("Добавить").as('button')
        cy.get('@button').should('be.disabled')
        cy.get('input').type("3")
        cy.get('@button').should('not.be.disabled')
    })

    it('Element is added correctly', () => {
        cy.contains("Добавить").as('button')
        cy.get('input').type("3")
        cy.get('@button').click()

        cy.get(CIRCLE_CIRCLE).as('circles')

        cy.get('@circles').last().should($el =>
            expect($el[0].className).to.match(new RegExp(`${ElementStates.Changing}`)))
        cy.wait(1000)
        cy.get('@circles').last().should($el =>
            expect($el[0].className).to.match(new RegExp(`${ElementStates.Default}`)))

        cy.get('input').type("4")
        cy.get('@button').click()
        cy.get(CIRCLE_CIRCLE).should('have.length', 2)
    })

    it('Removes element correctly', () => {
        cy.contains("Добавить").as('button')
        cy.contains("Удалить").as('removeButton')
        cy.get('input').type("3")
        cy.get('@button').click()
        cy.wait(1000)
        cy.get('input').type("4")
        cy.get('@button').click()
        cy.wait(1000)

        cy.get(CIRCLE_CIRCLE).should('have.length', 2)
        cy.get('@removeButton').click()
        cy.get(CIRCLE_CIRCLE).last().should($el =>
            expect($el[0].className).to.match(new RegExp(`${ElementStates.Changing}`)))
        cy.get(CIRCLE_CIRCLE).should('have.length', 1)
    })

    it('Clear button works', () => {
        cy.contains("Добавить").as('button')
        cy.contains("Очистить").as('clearButton')
        cy.get('input').type("3")
        cy.get('@button').click()
        cy.wait(1000)
        cy.get('input').type("4")
        cy.get('@button').click()
        cy.wait(1000)

        cy.get(CIRCLE_CIRCLE).should('have.length', 2)
        cy.get('@clearButton').click()
        cy.get(CIRCLE_CIRCLE).should('have.length', 0)
    })
})