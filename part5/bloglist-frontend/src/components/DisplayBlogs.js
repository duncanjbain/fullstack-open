import React from 'react'
import Blog from './Blog'

const DisplayBlogs = ({ blogs, handleLike, handleDelete }) => {
  return (
    <div>
      <div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete} />
        ))}
      </div>
    </div>
  )
}

export default DisplayBlogs