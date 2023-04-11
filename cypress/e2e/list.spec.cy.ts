/// <reference types="cypress" />

import {BASE_URL, LIST} from "./constants";
import {ElementStates} from "../../src/types/element-states";

describe('Stack tests', function () {
    beforeEach("Can access", () => {
        cy.visit(`${BASE_URL}${LIST}`);
    })

    it('Default list is created', () => {

        cy.get('div[class^="circle_circle"]').should('have.length', 1)
        cy.get('div[class^="circle_circle"]').should('have.text', 0)
        cy.get('div[class*="circle_head"]').should('contain.text', 'head')
        cy.get('div[class*="circle_tail"]').should('have.text', 'tail')
    })

    it("Button is disabled when empty", () => {
        cy.contains("Добавить").as('buttons')
        cy.get('@buttons').each($el => cy.wrap($el).should('be.disabled'))
        cy.get('input').each($el => cy.wrap($el).type("3"))
        cy.get('@buttons').each($el => cy.wrap($el).should('not.be.disabled'))
    })

    it('Element is added at head', () => {
        cy.contains("Добавить в head").as('button')
        cy.get('[data-cy="elem"]').type("3")
        cy.get('@button').click()

        cy.get('div[class*="circle_content"]').as('circles')

        cy.get('@circles').find('div[class*="circle_small"]').should($el =>
            expect($el[0].className).to.match(new RegExp(`${ElementStates.Changing}`)))
            .should('have.text', '3')
        cy.wait(1000)
        cy.get('@circles').first()
            .find('div[class*="circle_circle"]')
            .should($el => expect($el[0].className).to.match(new RegExp(`${ElementStates.Default}`)))
            .should('have.text', '3')
        cy.get('@circles').first()
            .find('div[class*="circle_head"]')
            .should('have.text', 'head')

        cy.get('div[class*="circle_circle"]').should('have.length', 2)
    })

    it('Element is added at index', () => {
        cy.contains("Добавить в head").as('button')
        cy.get('[data-cy="elem"]').type("3")
        cy.get('@button').click()
        cy.wait(1000)
        cy.contains("Добавить в head").as('button')
        cy.get('[data-cy="elem"]').type("3")
        cy.get('@button').click()
        cy.wait(1000)

        cy.contains("Добавить по индексу").as('buttonIdx')
        cy.get('[data-cy="elem"]').type("1")
        cy.get('[data-cy="index"]').type("1")
        cy.get('@buttonIdx').click()

        cy.get('div[class*="circle_content"]').as('circles')

        cy.get('div[class*="circle_small"]').should($el =>
            expect($el[0].className).to.match(new RegExp(`${ElementStates.Changing}`)))
            .should('have.text', '1')
        cy.get('@circles').eq(1).find('div[class*="circle_small"]')
            .should($el =>
            expect($el[0].className).to.match(new RegExp(`${ElementStates.Changing}`)))
            .should('have.text', '1')
        cy.get('@circles').eq(1).find('div[class*="circle_circle"]')
            .should($el =>
                expect($el[0].className).to.match(new RegExp(`${ElementStates.Default}`)))
            .should('have.text', '1')


        cy.get('div[class*="circle_circle"]').should('have.length', 4)
    })

    it('Element is added at tail', () => {
        cy.contains("Добавить в tail").as('button')
        cy.get('[data-cy="elem"]').type("3")
        cy.get('@button').click()

        cy.get('div[class*="circle_content"]').as('circles')

        cy.get('@circles').last().find('div[class*="circle_small"]').should($el =>
            expect($el[0].className).to.match(new RegExp(`${ElementStates.Changing}`)))
            .should('have.text', '3')
        cy.wait(1000)
        cy.get('@circles').last()
            .find('div[class*="circle_circle"]')
            .should($el => expect($el[0].className).to.match(new RegExp(`${ElementStates.Default}`)))
            .should('have.text', '3')
        cy.get('@circles').last()
            .find('div[class*="circle_tail"]')
            .should('have.text', 'tail')

        cy.get('div[class*="circle_circle"]').should('have.length', 2)
    })

    it('Removes element at head', () => {
        cy.contains("Добавить в tail").as('button')
        cy.contains("Удалить из head").as('removeButton')
        cy.get('[data-cy="elem"]').type("3")
        cy.get('@button').click()
        cy.wait(1000)

        cy.get('div[class*="circle_content"]').as('circles')
        cy.get('@circles').should('have.length', 2)

        cy.get('@removeButton').click()

        cy.get('@circles').first().find('div[class*="circle_small"]')
            .should('have.text', '0')
            .should($el => expect($el[0].className).to.match(new RegExp(`${ElementStates.Changing}`)))

        cy.wait(1000)

        cy.get('div[class*="circle_circle"]').first().should('have.text', '3')
        cy.get('div[class*="circle_circle"]').should('have.length', 1)
    })

    it('Removes element at index', () => {
        cy.contains("Добавить в head").as('button')
        cy.get('[data-cy="elem"]').type("1")
        cy.get('@button').click()
        cy.wait(1000)
        cy.contains("Добавить в head").as('button')
        cy.get('[data-cy="elem"]').type("2")
        cy.get('@button').click()
        cy.wait(1000)

        cy.contains("Удалить по индексу").as('buttonIdx')
        cy.get('[data-cy="index"]').type("1")

        cy.get('div[class*="circle_circle"]').should('have.length', 3)
        cy.get('@buttonIdx').click()

        cy.get('div[class*="circle_circle"]').eq(1)
            //.should($el => expect($el[0].className).to.match(new RegExp(`${ElementStates.Modified}`)))
            .should('not.have.text')
        cy.get('div[class*="circle_content"]').eq(1)
            .find('div[class*="circle_small"]')
            .should('have.text', '1')
        cy.get('div[class*="circle_circle"]').should('have.length', 2)
    })

    it('Removes element at tail', () => {
        cy.contains("Добавить в tail").as('button')
        cy.contains("Удалить из tail").as('removeButton')
        cy.get('[data-cy="elem"]').type("3")
        cy.get('@button').click()
        cy.wait(1000)

        cy.get('div[class*="circle_content"]').as('circles')
        cy.get('@circles').should('have.length', 2)

        cy.get('@removeButton').click()

        cy.get('@circles').eq(1)
            .find('div[class*="circle_small"]')
            .should('have.text', '3')
            .should($el => expect($el[0].className).to.match(new RegExp(`${ElementStates.Changing}`)))

        cy.wait(1000)

        cy.get('div[class*="circle_circle"]').last().should('have.text', '0')
        cy.get('div[class*="circle_circle"]').should('have.length', 1)
        cy.get('div[class*="circle_small"]').should('have.length', 0)
    })

})
