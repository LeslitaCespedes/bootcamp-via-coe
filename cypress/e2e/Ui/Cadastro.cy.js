///<reference types="cypress"/>

const faker = require('faker-br')
describe('US0002 -  Funcionalidade Cadastro', () => {
    beforeEach(() => {
        cy.visit('cadastrar')
    });
    it('Deve fazer cadastro com sucesso', () => {
        cy.cadastrar(faker.name.firstName(),faker.internet.email(),'Bootcamp','Bootcamp')

        cy.get('.large').should('contain', 'Dashboard')
        cy.get('[data-test="dashboard-createProfile"]').should('exist')
        cy.get('[data-test="dashboard-createProfile"]').click()
    });
});