class ExperienciaPage {
   get #posicao() {return cy.get('[data-test="experience-title"]')} 
   get #empresa() {return cy.get('[data-test="experience-company"] > .MuiInputBase-root > .MuiInputBase-input')} 
   get #local() {return cy.get('[data-test="experience-location"]')} 
   get #checkAtual() { return cy.get('[name="current"]')}
   get #dataInicio() {return cy.get('#from')} 
   get #dataFim() {return cy.get('#to')} 
   get #descricao() {return cy.get('[rows="1"]')} 
   get #bntSAdd() {return cy.get('[data-test="experience-submit"]')}

    addExperiencia(posiciao, empresa, local, dataInicio, dataFim, descricao){
        this.#posicao.type(posiciao)
        this.#empresa.type(empresa)
        this.#local.type(local)
        this.#dataInicio.type(dataInicio)
        this.#dataFim.type(dataFim)
        this.#descricao.type(descricao)
        this.#bntSAdd.click()
    }
    addExperienciaAtual(posiciao, empresa, local, dataInicio, dataFim, descricao){
        this.#posicao.type(posiciao)
        this.#empresa.type(empresa)
        this.#local.type(local)
        this.#dataInicio.type(dataInicio)       
        this.#checkAtual.check()
        this.#dataFim.type(dataFim)
        this.#descricao.type(descricao)
        this.#bntSAdd.click()
    }

}
export default new ExperienciaPage()