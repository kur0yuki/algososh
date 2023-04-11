/// <reference types="cypress" />

import {BASE_URL, FIBO, LIST, QUEUE, SORT, STACK, STRING} from "./constants";

describe('All routes are available', function() {
    beforeEach(() => {
        cy.visit(BASE_URL);
    })
    it('String should be available on /recursion', function() {
        cy.get(`a[href="/${STRING}"]`).click()
        cy.contains('Строка')
    });

    it('String should be available', function() {
        cy.get(`a[href="/${FIBO}"]`).click()
        cy.contains('Последовательность Фибоначчи')
    });
    it('Fibonacci should be available', function() {
        cy.get(`a[href="/${STRING}"]`).click()
        cy.contains('Строка')
    });

    it('Sorting should be available', function() {
        cy.get(`a[href="/${SORT}"]`).click()
        cy.contains('Сортировка')
    });

    it('List should be available', function() {
        cy.get(`a[href="/${LIST}"]`).click()
        cy.contains('список')
    });
    it('Queue should be available', function() {
        cy.get(`a[href="/${QUEUE}"]`).click()
        cy.contains('Очередь')
    });
    it('Stack should be available', function() {
        cy.get(`a[href="/${STACK}"]`).click()
        cy.contains('Стек')
    });
});