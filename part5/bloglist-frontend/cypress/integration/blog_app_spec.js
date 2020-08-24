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

  describe('when user is logged in functionality', function() {
    beforeEach(function() {
      cy.login({ username: 'testuser', password: 'testpassword' })
      cy.wait(1000) 
    })
    it('user can add a new blog', function() {
      cy.contains('New blog').click()
      cy.get('input[name=blogTitle]').type('New Test Blog')
      cy.get('input[name=blogAuthor]').type('Test Blog Author')
      cy.get('input[name=blogUrl').type("http://testblog.com")
      cy.get('form').submit()
      cy.contains('New Test Blog')
      cy.contains('Test Blog Author')
      cy.wait(1000) 
      cy.contains('View').click()
      cy.contains('Blog URL: http://testblog.com')
      cy.contains('Total Likes: 0')
      cy.contains('Like!')
      cy.contains('Blog Author: Test Blog Author')
      cy.contains('Delete Blog')

    })
    describe('user can interact with blog', function() {
      beforeEach(function() {
        const blogs = [
          {
            title: 'Test Blog One',
            author: 'Test Author One',
            url: 'blogone.com'
          },
          {
            title: 'Test Blog Two',
            author: 'Test Author Two',
            url: 'blogtwo.com'
          },
          {
            title: 'Test Blog Three',
            author: 'Test Author Three',
            url: 'blogthree.com'
          }
        ]
        cy.login({ username: 'testuser', password: 'testpassword' })
        blogs.map((blog) => {
          cy.createBlog(blog)
        })
        cy.wait(1000) 
      })
      it('user can like the new blog', function() {
        cy.contains('New blog').click()
        cy.get('input[name=blogTitle]').type('New Test Blog')
        cy.get('input[name=blogAuthor]').type('Test Blog Author')
        cy.get('input[name=blogUrl').type("http://testblog.com")
        cy.get('form').submit()
        cy.contains('New Test Blog')
        cy.contains('Test Blog Author')
        cy.wait(1000) 
        cy.contains('View').click()
        cy.contains('Like!').click()
        cy.contains('Total Likes: 1')
      })
  
      it('user can delete the newly added blog', function() {
        cy.contains('Test Blog One')
        cy.contains('Test Author One')
        cy.wait(1000) 
        cy.contains('View').click()
        cy.contains('Delete Blog').click()
        cy.contains('New Test Blog').should('not.exist')
      })
  
      it('if more than one blog, blogs are sorted by number of likes', function() {
        cy.get(':nth-child(3) > .blog-title > :nth-child(2) > button').click()
        cy.contains('Like!').click()
        cy.contains('Total Likes: 1')
        cy.wait(1000)
        cy.reload()
        cy.get(':nth-child(1) > .blog-title').contains('Test Blog Three')

      })
    })
    
  })


})