///<reference types="cypress"/>

const faker = require('faker-br')

describe('US0003 -  Criar perfil de usuario', () => {
   
    let password = faker.internet.password()

    beforeEach(() => {
        cy.visit('cadastrar')
        cy.cadastrar(faker.name.firstName(),faker.internet.email(),password,password)        
        cy.visit('criar-perfil')
       
    });
    it('Deve criar perfil de usuario com sucesso', () => {
                
       cy.criarPerfil(faker.company.companyName(),faker.internet.url(),
                      faker.address.city(),'Automação de Testes, Cypress, Testes Manuais', 'https://github.com/','Conte-nos um pouco sobre você')
        
        // redes sociais
        cy.get('[data-test="profile-socials"]').click()
        cy.adiocionarRedesSociais('https://twitter.com/meupferfil','https://facebook.com/meupferfil','https://youtube.com/meupferfil',
                                  'https://linkedin.com/meupferfil','https://instagram.com/meupferfil','https://medium.com/meupferfil')
        
        // click criar perfil
        cy.get('[data-test="profile-submit"]').click()

        //assert
        cy.get('.large').should('contain','Dashboard')
        cy.wait(200)
        cy.get('[data-test="alert"]').should('be.visible')
        
    });

    it('Validar Campos obrigatorios (Status - Conhecimentos)', () => {
        // click criar perfil com todos cos campos vazios
        cy.get('[data-test="profile-submit"]').click()

        cy.get('#status').should('not.contain.text')
        cy.get('[data-test="profile-skills"] > .MuiInputBase-root > .MuiInputBase-input').should('not.contain.text')
        cy.get('.MuiFormHelperText-root').should('be.visible')
        
    });

    it('Criar perfil só com dados obrigatorios com sucesso', () => {
        cy.get('#mui-component-select-status').click()
        cy.get('[data-test="status-1"]').click()
        cy.get('[data-test="profile-skills"] > .MuiInputBase-root > .MuiInputBase-input').type('Automação de Testes, Cypress, Testes Manuais')
        // click criar perfil
        cy.get('[data-test="profile-submit"]').click()

        cy.wait(200)
        cy.get('[data-test="alert"]').should('be.visible')
    });

    
});