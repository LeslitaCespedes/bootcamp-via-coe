/// <reference types="cypress"/>

import infoProfile from '../../fixtures/profile.json'
import infoExperience from '../../fixtures/experience.json'
import infoAcademica from '../../fixtures/formacaoAcademica.json'

describe('Teste para Perfil usuario', () => {
    
    let token
    beforeEach(()=>{
        cy.tokenJwt().then((auth) =>{
            token = auth
        })
    })

    it('[GET] Seleciona o usuario Logado', () => {
        
        cy.request({
            method: "GET",
            url: '/api/profile/me',
            headers:{
                Cookie: token
            }  
        }).then((response) =>{
            expect(response.status).to.eq(200)
        })
    });

    it('[POST] Criar perfil de usuario', () => {
        cy.request({
                method: "POST",
                url: '/api/profile',
                headers:{
                    Cookie: token
                },
                body: infoProfile

            }).then((response) =>{
                expect(response.status).to.eq(200)
        })       
    });

    it('[GET] Seleciona os perfis de usuarios cadastrados', () => {
        cy.request({
            method: "GET",
            url: '/api/profile',
        }).then((response) =>{
            expect(response.status).to.eq(200)
        })   
    });

    it('[GET] Selecionar Usuario pelo ID', () => {
        cy.idUsuario(token).then((response) => {
            let userId = response.body._id

            cy.request({
                method: "GET",
                url: `/api/profile/user/${userId}`,
            }).then((response) =>{
                expect(response.status).to.eq(200)
                })  
        });

    });

    it('[PUT] Adicionar um experiência profissional', () => {
        
        cy.request({    
            method: "PUT",
            url: '/api/profile/experience',
            headers:{
                Cookie: token
            },
            body: infoExperience[2]

        }).then((response) =>{
            expect(response.status).to.eq(200)
            })    
    });

    it('[DELETE] Deleta a primeira experiência profissional ', () => {

        cy.idExpProfissional(token).then((response) => {
            let experienceId = response.body.experience[0]._id

            cy.request({
                method: "DELETE",
                url: `/api/profile/experience/${experienceId}`,
                headers:{
                    Cookie: token
                }
                
            }).then((response) =>{
                expect(response.status).to.eq(200)
                }) 
        })
       
    });

    it('[PUT] Add formação acadêmica', () => {
        
        cy.request({
            method: "PUT",
            url: '/api/profile/education',
            headers:{
                Cookie: token
            },
            body: infoAcademica[0]                            
        }).then((response) =>{
            expect(response.status).to.eq(200)
            })
    });

    it('[DELETE] Deleta a primeira Formação Acadêmica ', () => {

        cy.idFormacaoAcademica(token).then((response) => {
            let educationId = response.body.education[0]._id

            cy.request({
                method: "DELETE",
                url: `/api/profile/education/${educationId}`,
                headers:{
                    Cookie: token
                }                
            }).then((response) =>{
                expect(response.status).to.eq(200)
                }) 
        })
       
    });
        
});