
//<reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html')
    })


    it('verifica o título da aplicação', function() {

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function(){
        const longText = 'teste, teste, teste teste, testeteste, testeteste, testeteste, testeteste, testeteste, testeteste, testeteste, testeteste, testeteste, testeteste, testeteste, testeteste, testeteste, testeteste, testeteste, testeteste, testeteste, testeteste, testeteste, testeteste, testeteste, teste'
        cy.get('#firstName').type('João')
        cy.get('#lastName').type('Vitor')
        cy.get('#email').type('joao@xemplo.com')
        cy.get('#open-text-area').type(longText, {delay : 0 })
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')

    })
    
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){

        cy.get('#firstName').type('João')
        cy.get('#lastName').type('Vitor')
        cy.get('#email').type('joao@xemplo,com')
        cy.get('#open-text-area').type('test')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')

    })

    it('campo telefone continua vazio quando preenchido com valor não-numérico', function(){
        cy.get('#phone')
        .type('llllllll')
        .should('have.value', '')


    })
    

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',function(){
        cy.get('#firstName').type('João')
        cy.get('#lastName').type('Vitor')
        cy.get('#email').type('joao@xemplo.com')
        cy.get('#phone-checkbox').check()
        .should('be.checked')
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
        

    })
    
    
    it('preenche e limpa os campos nome, sobrenome, email e telefone',function(){
      cy.get('#firstName')
      .type('João')
      .should('have.value','João')
      .clear()
      .should('have.value','')
      cy.get('#lastName')
      .type('Vitor')
      .should('have.value','Vitor')
      .clear()
      .should('have.value','')
      cy.get('#email')
      .type('joao@xemplo.com')
      .should('have.value','joao@xemplo.com')
      .clear()
      .should('have.value','')
      cy.get('#phone')
      .type('123456')
      .should('have.value','123456')
      .clear()  
      .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',function(){

        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')

    })
    

    it('envia o formuário com sucesso usando um comando customizado',function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })
    
    it('seleciona um produto (YouTube) por seu texto',function(){
        cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')


        })

        
    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')

    })
    it('eleciona um produto (Blog) por seu índice', function(){
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })
    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get(':nth-child(4) > input')
        .check()
        .should('have.value','feedback') 
        
    })
    it('marca cada tipo de atendimento',function(){
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio){
            cy.wrap($radio).check()
            
        })
        
    })

    it('marca ambos checkboxes, depois desmarca o último', function (){
        cy.get('#check input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')

    })

    it('seleciona um arquivo da pasta fixtures',function(){
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
           
        })
    })
    it('seleciona um arquivo simulando um drag-and-drop', function (){
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})//objeto, drag-drop é uma simulação de que o usuario esta arrastando um arquivo/pasta até o upload.
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')

    })
    
    })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')//cy.fixture pega a fixture(example que esta dentro da fixture)/ .as('sampleFile') como exemplo. estou pegando ela e dando um nome. 
        cy.get('input[type="file"]')
        .selectFile('@sampleFile')// quando cria um alias, voce tem que passaar com @ e o nome dele . 
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')

        })
    })
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a ')
        .should('have.attr', 'target', '_blank')// codigo significa que sem precisar clicar no link, sabemos que ira abrir outra pagina  
        
    })
    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a ')
        .invoke('removeAttr', 'target')//removeattr signica oq era quer remover, que é o target. invoke remove o atributo target onde ele ira verificar sem precisar abrir a pagina .
        .click()
        cy.contains('Talking About Testing')// conatins é para verificação do texto na pagina. 
        .should('be.visible')// confirmação do que o texto esta visivel 
    })

})

