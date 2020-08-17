const blogsRouter = require("express").Router();
const Blog = require("../models/blogs");
const User = require("../models/users")

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1});
    response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body
  const user = await User.findOne({})

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  });


  if (!blog.title || !blog.author) {
    return response.status(400).send({ Error: "title missing" });
  }
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
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
