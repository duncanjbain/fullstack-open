import React from 'react'

const AddBlogForm = ({blogTitle, blogAuthor, blogUrl, handleBlogTitleChange, handleBlogAuthorChange, handleBlogUrlChange, handleBlogAdd}) => {
  return (
    <section>
      <h3>Add a blog</h3>
      <form onSubmit={handleBlogAdd}>
      <div>
        Blog Title: <input type="text" value={blogTitle} onChange={handleBlogTitleChange} name="blogTitle" />
      </div>
      <div>
        Blog Author: <input type="text" value={blogAuthor} onChange={handleBlogAuthorChange} name="blogAuthor" />
      </div>
      <div>
        Blog Url: <input type="text" value={blogUrl} onChange={handleBlogUrlChange} name="blogUrl" />
      </div>
      <div>
      <button type="submit">Add Blog</button>
    </div>
      </form>
    </section>
  )
}

export default AddBlogForm