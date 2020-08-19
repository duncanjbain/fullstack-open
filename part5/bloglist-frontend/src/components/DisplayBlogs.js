import React from 'react'
import Blog from './Blog'

const DisplayBlogs = ({blogs}) => {
  return (
    <div>
      <ul>
        {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
      </ul>
    </div>
  )
}

export default DisplayBlogs