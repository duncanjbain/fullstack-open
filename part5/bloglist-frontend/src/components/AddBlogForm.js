import React, {useState} from 'react'

const AddBlogForm = ({handleBlogAdd}) => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogUrl, setBlogUrl] = useState("");


  const createNewBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }
    handleBlogAdd(newBlog)
    setBlogAuthor("")
    setBlogTitle("")
    setBlogUrl(")")
  }
  
  const handleBlogAuthorChange = (event) => {
    setBlogAuthor(event.target.value);
  };
  const handleBlogTitleChange = (event) => {
    setBlogTitle(event.target.value);
  };
  const handleBlogUrlChange = (event) => {
    setBlogUrl(event.target.value);
  };

  return (
    <section>
      <h3>Add a blog</h3>
      <form onSubmit={createNewBlog}>
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