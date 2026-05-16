describe('Place Order - Register while Checkout', () => {
  it('Should complete purchase after registering during checkout', () => {
    cy.visit('https://automationexercise.com')

    cy.wait(1000)

    cy.get('iframe').then(($iframes) => {
      $iframes.remove()
    })

    cy.get('a[href="/products"]').first().click()

    cy.wait(1000)

    cy.get('.features_items .product-image-wrapper')
      .eq(0)
      .find('.add-to-cart')
      .first()
      .click({ force: true })

    cy.wait(1000)

    cy.contains('Continue Shopping').click()

    cy.wait(1000)

    cy.get('.features_items .product-image-wrapper')
      .eq(1)
      .find('.add-to-cart')
      .first()
      .click({ force: true })

    cy.wait(1000)

    cy.contains('View Cart').click()

    cy.wait(1000)

    cy.url().should('include', '/view_cart')
    cy.contains('Shopping Cart').should('be.visible')

    cy.contains('Proceed To Checkout').first().click()

    cy.wait(1000)

    cy.get('#checkoutModal').should('be.visible')
    cy.get('#checkoutModal').contains('Register / Login').should('be.visible')

    cy.wait(1000)

    cy.visit('https://automationexercise.com/login')

    cy.wait(1000)

    const timestamp = Date.now()
    const name = `Juan QA ${timestamp}`
    const email = `juan.qa.${timestamp}@mail.com`

    cy.get('[data-qa="signup-name"]').should('be.visible').type(name)

    cy.wait(500)

    cy.get('[data-qa="signup-email"]').type(email)

    cy.wait(500)

    cy.get('[data-qa="signup-button"]').click()

    cy.wait(1000)

    cy.contains('Enter Account Information').should('be.visible')

    cy.get('#id_gender1').check()

    cy.wait(500)

    cy.get('[data-qa="password"]').type('Teste@12345')

    cy.wait(500)

    cy.get('[data-qa="days"]').select('10')
    cy.get('[data-qa="months"]').select('May')
    cy.get('[data-qa="years"]').select('1995')

    cy.wait(500)

    cy.get('[data-qa="first_name"]').type('Juan')
    cy.get('[data-qa="last_name"]').type('Santos')
    cy.get('[data-qa="company"]').type('QA Company')
    cy.get('[data-qa="address"]').type('Rua Teste, 123')

    cy.wait(500)

    cy.get('[data-qa="country"]').select('Canada')
    cy.get('[data-qa="state"]').type('Sao Paulo')
    cy.get('[data-qa="city"]').type('Sao Paulo')
    cy.get('[data-qa="zipcode"]').type('01001000')
    cy.get('[data-qa="mobile_number"]').type('11999999999')

    cy.wait(500)

    cy.get('[data-qa="create-account"]').click()

    cy.wait(1500)

    cy.contains('Account Created!').should('be.visible')

    cy.get('[data-qa="continue-button"]').click()

    cy.wait(1000)

    cy.contains('Logged in as').should('be.visible')

    cy.get('a[href="/view_cart"]').first().click()

    cy.wait(1000)

    cy.contains('Proceed To Checkout').first().click()

    cy.wait(1000)

    cy.contains('Address Details').should('be.visible')
    cy.contains('Review Your Order').should('be.visible')

    cy.get('.cart_description').should('have.length.at.least', 2)

    cy.wait(1000)

    cy.contains('Place Order').first().click()

    cy.wait(1000)

    cy.get('[data-qa="name-on-card"]').type('Juan Santos')
    cy.get('[data-qa="card-number"]').type('4111111111111111')
    cy.get('[data-qa="cvc"]').type('123')
    cy.get('[data-qa="expiry-month"]').type('12')
    cy.get('[data-qa="expiry-year"]').type('2030')

    cy.wait(500)

    cy.get('[data-qa="pay-button"]').click()

    cy.wait(2000)

    cy.contains('Order Placed!').should('be.visible')
    cy.contains('Congratulations! Your order has been confirmed!').should('be.visible')
  })
})