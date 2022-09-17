/// <reference types="cypress" />

describe('Funcionalidade Visualização dos pefis', () => {
    beforeEach(() => {
        cy.visit('perfis')
        cy.intercept({
            method: 'GET',
            url: 'api/profile',
        }, { 
             statusCode: 200,
             fixture: "profileApp"
        }
        )
        cy.reload()
    });

    it('Validar o primeiro item da lista', () => {
       // cy.get('[data-test="profile-name"]').first().should('contain', 'Pedro Guerra')
       cy.get('[data-test="profile-name"]').first().should('contain', 'Leslie Cespedes')
      
    });
    
    it('Validar lista vazia', () => {
       cy.intercept('api/profile', {statusCode:404})
       cy.reload()
       cy.get('[data-test="profiles-noProfiles"]').should('contain','Nenhum perfil encontrado')

    });
    it.only('Validar o ultimo item da lista', () => {
        cy.get('[data-test="profile-name"]').last().should('contain', 'Roberto dos Santos Filho')
      

    });
    it('Validar o terceiro item da lista', () => {
        cy.get('[data-test="profile-name"]').eq(2).should('contain', 'Paolina Summer')
    });
    
});