import {
  DELAY_IN_MS
} from '../../src/constants/delays';
import {
  circle,
  colors
} from '../utils/constants';

describe('String page works correct', () => {
  beforeEach(() => {
    cy.visit('/recursion')
  })

  it('if input is empty, action button is disabled', () => {
    cy.get('input').clear()
    cy.get('button[type="submit"]').should('be.disabled')
  })

  it('recursion works correct including styles ', () => {
    cy.get('input').type('abc').should('have.value', 'abc')
    cy.get('button').contains('Развернуть').click()

    cy.clock()

    cy.get(circle)
      .eq(0)
      .should("have.css", "border-color", colors.changingColor)
      .contains('a')

    cy.get(circle)
      .eq(1)
      .should("have.css", "border-color", colors.defaultColor)
      .contains('b')

    cy.get(circle)
      .eq(2)
      .should("have.css", "border-color", colors.changingColor)
      .contains('c')

    cy.tick(DELAY_IN_MS);

    cy.get(circle)
      .eq(0)
      .should("have.css", "border-color", colors.modifiedColor)
      .contains('c')

    cy.get(circle)
      .eq(1)
      .should("have.css", "border-color", colors.changingColor)
      .contains('b')

    cy.get(circle)
      .eq(2)
      .should("have.css", "border-color", colors.modifiedColor)
      .contains('a')

    cy.tick(DELAY_IN_MS);

    cy.get(circle)
      .each(circle => {
        cy.wrap(circle)
          .should("have.css", "border-color", colors.modifiedColor)
      })
    cy.get(circle)
      .eq(0)
      .contains('c')

    cy.get(circle)
      .eq(1)
      .contains('b')

    cy.get(circle)
      .eq(2)
      .contains('a')
  })
})