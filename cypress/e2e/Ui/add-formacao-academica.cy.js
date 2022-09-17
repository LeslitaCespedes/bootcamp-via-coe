/// <reference types="cypress"/>
const formacaoPage = require('../../support/Formacao/formacao-pages')

describe('Funcionalidade Adicionar Formacao Academica', () => {
    beforeEach(() => {
        cy.fixture("usuarios").then((usr) => {
            cy.login(usr[0].email, usr[0].senha)
            cy.title().should('eq', 'ConexaoQA')
           
        })
    });
    it('Deve adicionar formação academica com sucesso', () => {    
        
        cy.visit('/adicionar-formacao')  
        formacaoPage.addFormacao("UNICAMP)","engenheira de qualidade","QA","02/02/2015","10/12/2021","Quality Assurance, plano de testes e gestão de bugs")
        cy.get('[data-test="education-delete"]').should('be.visible')      
    });
    it('Deve adicionar cursando uma formação academica  com sucesso', () => {    
        cy.visit('/adicionar-formacao') 
        formacaoPage.addFormacaoCursando("EBAC","tecnico","QA","02/02/2016","10/12/2023","processos de automação de testes para aplicativos de web e mobile")
        cy.get('[data-test="education-delete"]').should('be.visible')
    });
    it('Deve eliminar uma formação academica com sucesso', () => {
      cy.get('[data-test="education-delete"]').first().click()
      cy.contains('Formação Acadêmica Removida').should('be.visible')
    });

});