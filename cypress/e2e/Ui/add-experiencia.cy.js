/// <reference types="cypress" />
const experienciaPage = require('../../support/Experiencia/experiencia-pages')

describe('Funcionalidade: Adicionar experiência', () => {
    
    beforeEach(() => {
        
      /* cy.fixture("usuarios").then((usr) => {
            cy.login(usr[0].email, usr[0].senha)
            cy.title().should('eq', 'ConexaoQA')
        })*/
        cy.loginApp()
        cy.visit('adicionar-experiencia')
        
    })

    it.only('Acessar Experiencia', () =>{
        cy.log(2+2)
    })
    
    it('Deve adicionar uma experiência com sucesso', () => {
        cy.visit('adicionar-experiencia')
        experienciaPage.addExperiencia('QA', 'Via', 'SP', '01/01/2020','01/08/2030', 'ViaHub é TOP' )
        cy.wait(3000)
        cy.get('[data-test="experience-delete"]').should('exist')
       
    });
    it('Deve adicionar uma experiência Atual com sucesso', () => {
        cy.visit('adicionar-experiencia')
        experienciaPage.addExperienciaAtual('QA', 'Via', 'SP', '01/01/2020','01/08/2030', 'ViaHub é TOP' )
        cy.get('[data-test="experience-delete"]').should('exist')
       
    });
    it('Deve excluir uma experiência com sucesso', () => {
        cy.visit('adicionar-experiencia')
        experienciaPage.addExperiencia('QA', 'Via', 'SP', '01/01/2020','01/08/2030', 'ViaHub é TOP' )
        cy.get('[data-test="experience-delete"]').first().click()
        cy.contains('Experiência Removida').should('be.visible')
        cy.wait(3000)
        cy.get('[data-test="alert"]').should('contain', "Experiência Removida")
    });

    it('Deve eliminar uma experiência Atual com sucesso', () => {
        cy.get('[data-test="experience-delete"]').first().click()
        cy.contains('Experiência Removida').should('be.visible')
        cy.wait(2000)
        cy.get('[data-test="alert"]').should('contain', "Experiência Removida")
    });
});