
//<reference types="Cypress" />
  
describe('Central de Atendimento ao Cliente TAT',function() {
    const THEE_SECONDS_IN_MS = 3000
    beforeEach(function(){
        cy.visit('./src/index.html')
    })


    it('verifica o título da aplicação', function() {

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function(){
        const longText = 'teste, teste, teste teste, testeteste, testeteste, testeteste, testeteste, testeteste, testeteste, testeteste, testeteste, testeteste, testeteste, testeteste, testeteste, testeteste, testeteste, testeteste, testeteste, testeteste, testeteste, testeteste, testeteste, testeteste, teste'
        cy.clock()
        cy.get('#firstName').type('João')
        cy.get('#lastName').type('Vitor')
        cy.get('#email').type('joao@xemplo.com')
        cy.get('#open-text-area').type(longText, {delay : 0 })
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
        cy.tick(THEE_SECONDS_IN_MS)
        cy.get('.success').should('not.be.visible')
        

    })
    
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.clock()
        cy.get('#firstName').type('João')
        cy.get('#lastName').type('Vitor')
        cy.get('#email').type('joao@xemplo,com')
        cy.get('#open-text-area').type('test')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
        cy.tick(THEE_SECONDS_IN_MS)
        cy.get('.success').should('not.be.visible')


    })

    Cypress._.times(3,function(){
        it('campo telefone continua vazio quando preenchido com valor não-numérico', function(){
            cy.get('#phone')
            .type('llllllll')
            .should('have.value', '')
        })
        
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',function(){
        cy.clock()
        cy.get('#firstName').type('João')
        cy.get('#lastName').type('Vitor')
        cy.get('#email').type('joao@xemplo.com')
        cy.get('#phone-checkbox').check()
        .should('be.checked')
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
        cy.tick(THEE_SECONDS_IN_MS)
        cy.get('.success').should('not.be.visible')


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
        cy.clock()
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
        cy.tick(THEE_SECONDS_IN_MS)
        cy.get('.success').should('not.be.visible')

    })
    

    it('envia o formuário com sucesso usando um comando customizado',function(){
        cy.clock()
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
        cy.tick(THEE_SECONDS_IN_MS)
        cy.get('.success').should('not.be.visible')
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
    it('seleciona um produto (Blog) por seu índice', function(){
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

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')// and signfica " e " 
          .invoke('hide')// hide significa esconder
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show') // show faz com que as mensagem que nao estão visivel, apareca !
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      })

      it('preenche a area de texto usando o comando invoke',function(){
        const longText = Cypress._.repeat('0123456789', 20)// foi usadi repeat para ele fazer a reptição dos numero, 20X .
        
        
        cy.get('#open-text-area')
        .invoke('val', longText)// invoca o valor da area de texto e seta no valor o texto longo que definimos, 20x os numeros 
        .should('have.value', longText)// usando para verificar se realmente é o valordo texto longo
      })

      it.only('faz uma requisição HTTP', function(){
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')// cy.resquet faz requisiçoes a nivel de rede 
        //desestruturação de obejto em JS 
        // a funçaõ de call back rebece a resposta da requisição 
        .should(function(response){
            const {status, statusText, body } = response  
            expect(status).to.equal(200) //Verificação se o status é 200 
            expect(statusText).to.equal('OK') //verifica se o status text é 'ok'
            expect(body).to.include('CAC TAT') //verifica se o body tem o texto CAC TAT 
        })


      })
      it.only('Aparece gato ',function(){
        cy.get('#cat')
            .invoke('show')
            .should('be.visible')
        cy.get('#title')
            .invoke('text', 'CAT TAT')
        cy.get('#subtitle')
            .invoke('text', 'Eu ❤️ gatos')


      })
      

})

