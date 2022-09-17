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
import auth from '../fixtures/auth.json'
import infoExperience from '../fixtures/experience.json'
import infoAcademica from '../fixtures/formacaoAcademica.json'

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

import user from '../fixtures/usuarios.json'
Cypress.Commands.add("loginApp", (email, password) => { 
    cy.request({
      method: 'POST',
      url: '/api/auth',
      body: {
         "email": user[0].email,
         "password": user[0].senha
      }
    })
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


// APIs

 Cypress.Commands.add("tokenJwt", () => {
   cy.request({
      method: 'POST',
      url: 'api/auth',
      body: auth
   }).then((response) =>{
      return response.body.jwt
   })    
})

Cypress.Commands.add("criarPostagem", (token,value) => {
   cy.request({
      method: 'POST',
      url: 'api/posts',
      headers: {
         Cookie: token
      },
      body: {
         text: value
      }
  })
   
})

Cypress.Commands.add("idUsuario", (token) => {
   cy.request({
      method: 'GET',
      url: '/api/auth',
      headers: {
         Cookie: token
      }
  })
   
})


Cypress.Commands.add("idExpProfissional", (token) => {
   
   cy.request({    
         method: "PUT",
         url: '/api/profile/experience',
         headers:{
            Cookie: token
         },
         body: infoExperience[0]
   })
   
})

Cypress.Commands.add("idFormacaoAcademica", (token) => {
   cy.request({
      method: "PUT",
      url: '/api/profile/education',
      headers:{
          Cookie: token
      },
      body: infoAcademica[1]    
   })
   
})

