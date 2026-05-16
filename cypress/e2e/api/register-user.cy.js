describe('Register User API', () => {

  it('Should register a new user successfully', () => {

    const timestamp = Date.now()

    const user = {
      name: `Juan QA ${timestamp}`,
      email: `juan${timestamp}@mail.com`,
      password: 'Teste123',
      title: 'Mr',
      birth_date: '10',
      birth_month: '5',
      birth_year: '1995',
      firstname: 'Juan',
      lastname: 'Santos',
      company: 'QA Company',
      address1: 'Rua Teste',
      country: 'Canada',
      zipcode: '12345',
      state: 'Sao Paulo',
      city: 'Sao Paulo',
      mobile_number: '11999999999'
    }

    cy.request({
      method: 'POST',
      url: 'https://automationexercise.com/api/createAccount',
      form: true,
      body: user
    }).then((response) => {

      expect(response.status).to.eq(200)
      expect(response.body).to.include('User created')

    })

  })

})