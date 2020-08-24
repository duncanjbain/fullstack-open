describe('Blog app', function() {
  const user = {
    name: 'Test User',
    username: 'testuser',
    password: 'testpassword'
  }
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    cy.request('POST', 'http://localhost:3001/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login')
  })

  describe('login functionality', function() {
    it('login with incorrect username and password fails', function() {
      cy.get('input[name=username').type('wrongname')
      cy.get('input[name=password]').type('wrongpassword')
      cy.get('form').submit() 
      cy.contains('Wrong username or password entered!')
    })

    it('login with correct username and password works', function() {
      cy.get('input[name=username').type(user.username)
      cy.get('input[name=password]').type(user.password)
      cy.get('form').submit() 
      cy.contains(`Welcome, ${user.username}`)
    })

  })


})