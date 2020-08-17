const Blog = require('../models/blogs')
const User = require('../models/users')

const initialBlogs = [
  {
    title: "Blog One",
    author: "Duncan Bain",
    url: "https://duncanbain.io/blog-one",
    likes: 15,
  },
  {
    title: "Blog Two",
    author: "Duncan Bain",
    url: "https://duncanbain.io/blog-two",
    likes: 1,
  },
  {
    title: "Blog Three",
    author: "Duncan Bain",
    url: "https://duncanbain.io/blog-three",
    likes: 7,
  },
  {
    title: "Blog Four",
    author: "Duncan Bain",
    url: "https://duncanbain.io/blog-four",
    likes: 5,
  },
];

const usersInDB = async() => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, usersInDB
}