/// <reference types="cypress" />

import { policyHoldersPath } from "../../src/api/policyHolders";

describe('happy path', () => {
  it('runs happy path successfully', () => {
    cy.visit('/');
    cy.getTestEl('table_link').should('be.visible');
    cy.getTestEl('you_go_link').should('be.visible');
    cy.getTestEl('policyholders_link').should('be.visible');

    /**
     * TODO: Challenge 10 - Update this test
     * - Click the Policyholders sidebar link
     * - Assert that a network request is made
     * - Assert that data from the network is displayed
     */
    cy.intercept({
      method: 'GET',
      url: policyHoldersPath,
    }).as('policyHoldersGet')
    cy.getTestEl('policyholders_link').click()
    cy.wait('@policyHoldersGet').then((interception) => {
      assert.isNotNull(interception.response.body, 'Policy Holders Get returns data')
    })
    const items = ['Mrs. Holder', '29', '123 Lane Ave 3H, Santa Monica, CA 90405','1-989-989-9898', 'Yes']
    items.forEach((item) => {
      cy.contains('tbody tr', item)
    })
  });
});
