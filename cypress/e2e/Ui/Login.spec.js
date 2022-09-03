/// <reference types="cypress" />
import usuarios from "../../fixtures/usuarios.json"

describe('US0001 - Funcionalidade Login', () => {
   
    it('Deve fazer login com sucesso', () => {
        
        cy.login('leslita@teste.com','Bootcamp')
        cy.get('[data-test="dashboard-welcome"]').should('contain', ' Bem-vindo')
    });

    it('Validar mensagem de erro com usuario invalido', () => {
        cy.login('leslita@teste.com','bootcampsd')
        cy.get('[data-test="alert"]').should('contain', 'Credenciais inválidas')
    });

    it('Deve fazer login com sucesso - usando importação', () => {
        cy.login(usuarios[0].email, usuarios[0].senha)
        cy.title().should('eq', 'ConexaoQA')
    });
    it('Deve fazer login com sucesso - usando fixture', () => {
        cy.fixture("usuarios").then((usr) => {
            cy.login(usr[0].email, usr[0].senha)
            cy.title().should('eq', 'ConexaoQA')
        })
        
    });

})


/** 
 * Funcionalidade: Login
 * Eu como usuario das Conexao QA
 * Quero fazer o Login
 * Para editar meu perfil
 * 
 * Cenario: Login com sucesso
 * Cenario: Validar mensagem de erro 
 * Cenario: Cadastro com sucesso
 * Cenario: Recuperar senha
 * 
 */