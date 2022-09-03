/// <reference types="cypress"/>
const formacaoPage = require('../../support/Formacao/formacao-pages')
const faker = require('faker-br')

describe('Funcionalidade Adicionar Formacao Academica', () => {
    beforeEach(() => {
        cy.fixture("usuarios").then((usr) => {
            cy.login(usr[0].email, usr[0].senha)
            cy.title().should('eq', 'ConexaoQA')
            cy.visit('/adicionar-formacao')
           
        })
    });
    it('Deve adicionar formação academica com sucesso', () => {      
        formacaoPage.addFormacao("UNICAMP)","engenheira de qualidade","QA","02/02/2015","10/12/2021","Quality Assurance, plano de testes e gestão de bugs")
        cy.get('[data-test="education-fieldOfStudy"]').should('contain','Formações Acadêmicas')       
    });
    it('Deve adicionar cursando uma formação academica  com sucesso', () => {       
        formacaoPage.addFormacaoCursando("EBAC","tecnico","QA","02/02/2015","10/12/2022","processos de automação de testes para aplicativos de web e mobile")
        cy.get('[data-test="education-delete"]').should('be.visible')
    });
    it('Opcão "Data ate" deve estar deshabilitada se a opçaõ "Cursando" e check', () => {        
        formacaoPage.addFormacaoCursando("EBAC","tecnico","QA","02/02/2015","10/12/2022","processos de automação de testes para aplicativos de web e mobile")
        cy.get('#to').should('be.disabled')
    });
    it('Deve eliminar uma formação academica com sucesso', () => {
      cy.get('[data-test="education-delete"]').first().click()
      cy.contains('Formação Acadêmica Removida').should('be.visible')
    });

});