import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders blog title and author only by default', () => {
  const blog = {
    title: "Jest Test Blog",
    author: "Jest Test Author",
    url: "google.com",
    likes: 15
  }

  const component = render(
    <Blog blog={blog} />
  )
  

  expect(component.container).toHaveTextContent('Blog: Jest Test Blog')
  expect(component.container).toHaveTextContent('Author: Jest Test Author')
  expect(component.container).not.toHaveTextContent('Blog Url: google.com')
  expect(component.container).not.toHaveTextContent('Total Likes: 15')
})

