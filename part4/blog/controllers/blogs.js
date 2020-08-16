const blogsRouter = require("express").Router();
const Blog = require("../models/blogs");

blogsRouter.get("/", async (request, response) => {
  try {
    const blogs = await Blog.find({});
    response.json(blogs);
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);

  if (!blog.title || !blog.author) {
    return response.status(400).send({ Error: "title missing" });
  }
  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  try {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.patch("/:id", async (request, response) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, {$set: {likes: request.body.likes}}, { new: true })
    response.status(200).json(updatedBlog)
  } catch (exception) { 
    next(exception)
  }
})

module.exports = blogsRouter;
