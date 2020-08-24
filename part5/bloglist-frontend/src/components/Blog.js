import React, { useState } from "react";

const Blog = ({ blog, handleLike, handleDelete }) => {
  const [blogDetailVisible, setBlogDetailVisible] = useState(false);

  const toggleBlogDetail = (event) => {
    event.preventDefault();
    setBlogDetailVisible(!blogDetailVisible);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    paddingBottom: 10,
    border: "solid",
    borderWidth: 1,
    marginBottom: 10,
  };

  return (
    <div style={blogStyle}>
      <div className="blog-title">
        Blog: {blog.title}
        <div className="blog-author">Author: {blog.author}</div>
        <div>
          <button onClick={toggleBlogDetail}>View</button>
        </div>
      </div>
      {blogDetailVisible && (
        <>
          <div className="blog-url">Blog URL: {blog.url}</div>
          <div className="blog-likes">
            Total Likes: {blog.likes}{" "}
            <button onClick={(event) => handleLike(event, blog.id)}>
              Like!
            </button>
          </div>
          <div className="blog-author">Blog Author: {blog.author}</div>
          <div>
            <button onClick={(event) => handleDelete(event, blog.id)}>Delete Blog</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Blog;
