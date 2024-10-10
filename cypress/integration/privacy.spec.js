it.only('testa a página da política de privacidade de forma independente',function(){
    cy.visit('./src/privacy.html')
    cy.contains('Talking About Testing')// conatins é para verificação do texto na pagina. 
        .should('be.visible')// confirmação do que o texto esta visivel 
})