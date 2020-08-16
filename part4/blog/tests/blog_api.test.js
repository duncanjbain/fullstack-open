const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blogs");
const { init } = require("../models/blogs");

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

beforeEach(async () => {
await Blog.deleteMany({})

let blogObject = new Blog(initialBlogs[0])
await blogObject.save()

blogObject = new Blog(initialBlogs[1])
await blogObject.save()

blogObject = new Blog(initialBlogs[2])
await blogObject.save()

blogObject = new Blog(initialBlogs[3])
await blogObject.save()

});

test("notes are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

afterAll(() => {
  mongoose.connection.close();
});
