import React, { useState } from "react";
const Blog = ({ blog }) => {
  const [blogDetailVisible, setBlogDetailVisible] = useState(false);

  const toggleBlogDetail = (event) => {
    event.preventDefault();
    setBlogDetailVisible(!blogDetailVisible);
  };

  const voteLike = (event) => {
    event.preventDefault()
    return (
      console.log("like clicked")
    )
  }

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
      <div>
        Blog Title: {blog.title} -{" "}
        <button onClick={toggleBlogDetail}>View</button>
      </div>
      {blogDetailVisible && <>
      <div>
        Blog URL: {blog.url}
      </div>
      <div>
        Total Likes: {blog.likes} <button onClick={voteLike}>Like!</button>
      </div>
      <div>
        Blog Author: {blog.author}
      </div>
      </>}
    </div>
  );
};

export default Blog;
