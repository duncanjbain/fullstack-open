const blogsRouter = require("express").Router();
const Blog = require("../models/blogs");
const User = require("../models/users");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const token = request.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  if (!blog.title || !blog.author) {
    return response.status(400).send({ Error: "title missing" });
  }
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog).end();
});

blogsRouter.delete("/:id", async (request, response) => {
  const token = request.token;
  const blogToDelete = await Blog.findById(request.params.id);
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!token || !decodedToken) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  
  if (blogToDelete.user.toString() !== decodedToken.id) {
    return response.status(401).json({ error: "you do not own this blog" });
  }

  try {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.get("/:id", async (request, response) => {
  const singleBlog = await Blog.findById(request.params.id).populate("user", {
    username: 1,
    name: 1,
  });
  return response.status(200).json(singleBlog);
});

blogsRouter.patch("/:id", async (request, response) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      { $set: { likes: request.body.likes } },
      { new: true }
    );
    response.status(200).json(updatedBlog);
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogsRouter;
