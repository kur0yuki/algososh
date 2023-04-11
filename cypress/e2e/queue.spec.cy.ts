/// <reference types="cypress" />

import {BASE_URL, QUEUE} from "./constants";
import {ElementStates} from "../../src/types/element-states";

describe('Queue tests', function () {
    beforeEach("Can access", () => {
        cy.visit(`${BASE_URL}${QUEUE}`);
    })
    it("Button is disabled when empty", () => {
        cy.contains("Добавить").as('button')
        cy.get('@button').should('be.disabled')
        cy.get('input').type("3")
        cy.get('@button').should('not.be.disabled')
    })

    it('Element added', ()=> {
        cy.contains("Добавить").as('button')
        cy.get('input').type("3")
        cy.get('@button').click()

        cy.get('div[class*="circle_content"]').as('circles')

        cy.get('@circles').contains('tail').closest('div[class*="circle_content"]')
            .find('div[class*="circle_circle"]')
            .should($el => expect($el[0].className).to.match(new RegExp(`${ElementStates.Changing}`)))

        cy.get('@circles').contains('tail').closest('div[class*="circle_content"]')
            .should('contain.text', 3)
    })

    it('Element removed', ()=> {
        cy.contains("Добавить").as('button')
        cy.contains("Удалить").as('removeButton')
        cy.get('input').type("4")
        cy.get('@button').click()
        cy.wait(1000)
        cy.get('input').type("5")
        cy.get('@button').click()
        cy.wait(1000)

        cy.get('@removeButton').click()

        cy.get('div[class*="circle_content"]').as('circles')
        cy.get('@circles').contains('head').closest('div[class*="circle_content"]')
            .find('div[class*="circle_circle"]')
            .should($el => expect($el[0].className).to.match(new RegExp(`${ElementStates.Changing}`)))
        cy.get('@circles').contains('head').closest('div[class*="circle_content"]')
            .should('contain.text', 5)
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

        cy.get('p[class*="circle_letter"]').should('be.empty', 5)
        cy.get('@clearButton').click()
        cy.get('p[class*="circle_letter"]').should('be.empty', 7)
    })
})