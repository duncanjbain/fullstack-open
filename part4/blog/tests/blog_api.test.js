const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blogs");
const helper = require("./test_helper");
const { post } = require("../app");

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();

  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();

  blogObject = new Blog(helper.initialBlogs[2]);
  await blogObject.save();

  blogObject = new Blog(helper.initialBlogs[3]);
  await blogObject.save();
});

test("notes are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("the blog has an ID field", async () => {
  const result = await api
    .get("/api/blogs/")
    .expect(200)
    .expect("Content-Type", /application\/json/);
  expect(result.body[0].id).toBeDefined();
});

test("making a correctly formatted POST request to /api/blogs creates a new record", async () => {
  await api
    .post("/api/blogs")
    .send({
      title: "Test Blog",
      author: "Test Author",
      url: "test.com",
      likes: 15,
    })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(201);

  const result = await api
    .get("/api/blogs/")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(result.body[4].title).toBe("Test Blog");
});

test("submitting a POST request to /api/blogs that is missing a likes field creates a blog record with likes equal to 0", async () => {
  await api
    .post("/api/blogs")
    .send({
      title: "No Likes",
      author: "Test Author",
      url: "test.com",
    })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(201);

  const result = await api
    .get("/api/blogs/")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(result.body[4].likes).toBe(0);
});

test("submitting a POST request without a title and author field is rejected with code 400", async () => {
  await api
    .post("/api/blogs")
    .send({
      url: "test.com",
      likes: 15,
    })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(400);
});

test("can delete blog with DELETE request and blog ID", async () => {
  const initResponse = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const blogID = initResponse.body[0].id;
  console.log(blogID);

  await api
    .delete(`/api/blogs/${blogID}`)
    .expect(204);

  const finalResponse = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

    expect(blogID).not.toBe(finalResponse.body[0].id)

});

afterAll(() => {
  mongoose.connection.close();
});
