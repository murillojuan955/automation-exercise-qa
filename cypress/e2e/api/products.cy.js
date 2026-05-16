describe('API Products', () => {

  it('Should return products list with valid contract', () => {

    cy.request({
      method: 'GET',
      url: 'https://automationexercise.com/api/productsList'
    }).then((response) => {

      expect(response.status).to.eq(200)

      const body = typeof response.body === 'string'
        ? JSON.parse(response.body)
        : response.body

      expect(body).to.have.property('responseCode', 200)
      expect(body).to.have.property('products')
      expect(body.products).to.be.an('array')
      expect(body.products.length).to.be.greaterThan(0)

      body.products.forEach((product) => {
        expect(product).to.have.property('id').and.to.be.a('number')
        expect(product).to.have.property('name').and.to.be.a('string')
        expect(product).to.have.property('price').and.to.be.a('string')
        expect(product).to.have.property('brand').and.to.be.a('string')
        expect(product).to.have.property('category').and.to.be.an('object')

        expect(product.category).to.have.property('usertype').and.to.be.an('object')
        expect(product.category.usertype).to.have.property('usertype').and.to.be.a('string')
        expect(product.category).to.have.property('category').and.to.be.a('string')
      })

    })

  })

})