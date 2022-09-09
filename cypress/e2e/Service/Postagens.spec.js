/// <reference types="cypress"/>

describe('Testes de Criação de Postagens', () => {
    let token
    beforeEach(()=>{
        cy.tokenJwt().then((auth) =>{
            token = auth
        })
    })

    it('[POST] Criar uma postagem', () => {
        cy.request({
            method: "POST",
            url: '/api/posts',
            headers:{
                Cookie: token
            },
            body:{ 
                "text": "bootcamp teste"
            }
            
        }).then((response) => {
            expect(response.status).to.eq(201)
        })
    });

    it('[GET] Consultar uma postagem', () => {
        cy.request({
            method: "GET",
            url: '/api/posts',
            headers:{
                Cookie: token
            }            
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    });

    it('[GET] Consultar uma postagem por ID', () => {
        cy.criarPostagem(token,"bootcamp-postID").then((response) =>{
            let id = response.body._id

            cy.request({
                method: 'GET',
                url: `api/posts/${id}`,
                headers: {
                    Cookie: token
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })
       
    });


    it('[DELETE] Excluir uma postagem', () => {
        cy.criarPostagem(token,"postagem-a-deletar").then((response) =>{
            let id = response.body._id

            cy.request({
                method: 'DELETE',
                url: `api/posts/${id}`,
                failOnStatusCode: false,
                headers: {
                    Cookie: token
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.msg).to.eq("Post removido")
            })
        })
       
    });
        

    it('[PUT] Curtir uma postagem', () => {
        cy.criarPostagem(token,"postagem-a-deletar").then((response) =>{
            let id = response.body._id

            cy.request({
                method: 'PUT',
                url: `api/posts/like/${id}`,
                failOnStatusCode: false,
                headers: {
                    Cookie: token
                }
            }).then((response) => {
                expect(response.status).to.eq(200)  
            })
        })
    });
        
});