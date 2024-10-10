Cypress.Commands.add('fillMandatoryFieldsAndSubmit',function(){
    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Vitor')
    cy.get('#email').type('joao@xemplo.com')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()

})