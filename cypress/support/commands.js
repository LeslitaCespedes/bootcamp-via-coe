// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

/// <reference types="Cypress" />

Cypress.Commands.add('navigate', (route) => {
    cy.intercept(route).as('loadpage')
    cy.visit(route, { timeout: 30000 })
    cy.wait('@loadpage')
})

Cypress.Commands.add("login", (email, password) => { 
    cy.visit('login')
    cy.get('[data-test="login-email"] > .MuiInputBase-root > .MuiInputBase-input').type(email)
    cy.get('[data-test="login-password"] > .MuiInputBase-root > .MuiInputBase-input').type(password)
    cy.get('[data-test="login-submit"]').click()
 })
 
 // cadastrar usuario
 Cypress.Commands.add("cadastrar", (nome,email, senha) => { 
    cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').type(nome)
    cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').type(email)
    cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').type(senha)
    cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').type(senha)
    cy.get('[data-test="register-submit"]').click()
 })

 // Criar perfil usuario

 Cypress.Commands.add("criarPerfil", (empresa,webSite,localicacao,conhecimentos,gitHub,biografia) => {
    cy.get('#mui-component-select-status').click()
    cy.get('[data-test="status-1"]').click() //select(['QA Júnior'])       
    cy.get('[data-test="profile-company"] > .MuiInputBase-root > .MuiInputBase-input').type(empresa)
    cy.get('[data-test="profile-webSite"] > .MuiInputBase-root > .MuiInputBase-input').type(webSite)
    cy.get('[data-test="profile-location"] > .MuiInputBase-root > .MuiInputBase-input').type(localicacao)
    cy.get('[data-test="profile-skills"] > .MuiInputBase-root > .MuiInputBase-input').type(conhecimentos)
    cy.get('[data-test="profile-gitHub"] > .MuiInputBase-root > .MuiInputBase-input').type(gitHub)
    cy.get('[rows="1"]').type(biografia) 



 })

 Cypress.Commands.add("adiocionarRedesSociais", (twitter,facebook,youtube,linkedin,instagram,medium) => {
   
    cy.get('[data-test="profile-twitter"] > .MuiInputBase-root > .MuiInputBase-input').type(twitter)
    cy.get('[data-test="profile-facebook"] > .MuiInputBase-root > .MuiInputBase-input').type(facebook)
    cy.get('[data-test="profile-youtube"] > .MuiInputBase-root > .MuiInputBase-input').type(youtube)
    cy.get('[data-test="profile-linkedin"]').type(linkedin)
    cy.get('[data-test="profile-instagram"] > .MuiInputBase-root > .MuiInputBase-input').type(instagram)
    cy.get('[data-test="profile-medium"] > .MuiInputBase-root > .MuiInputBase-input').type(medium)
    
 })