const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blogs");
const helper = require("./test_helper");
const bcrypt = require('bcrypt')
const User = require('../models/users')


beforeEach(async () => {
  await Blog.deleteMany({});

const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
const promiseArray = blogObjects.map(blog => blog.save())
await Promise.all(promiseArray)

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

  await api
    .delete(`/api/blogs/${blogID}`)
    .expect(204);

  const finalResponse = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

    expect(blogID).not.toBe(finalResponse.body[0].id)

});

test("can update number of likes with a PUT request with blog ID and new number of likes", async () => {
  const initResponse = await api
  .get("/api/blogs/")
  .expect(200)
  .expect("Content-Type", /application\/json/);
  const initLikes = initResponse.body[0].likes
  const blogID = initResponse.body[0].id

  const request = await api
    .patch(`/api/blogs/${blogID}/`)
    .send({
      likes: 55,
    })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)

  const finalResponse = await api
  .get("/api/blogs/")
  .expect(200)
  .expect("Content-Type", /application\/json/);

  expect(initLikes).not.toBe(finalResponse.body[0].likes)
  expect(finalResponse.body[0].likes).toBe(55)

})

describe('when there is initially one user in the db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({username: 'root', passwordHash})
    await user.save()
  })

  test('successfully create new user', async () => {
    const initialUsers = await helper.usersInDB()

    const newUser = {
      username: "testuser",
      name: "Test User",
      password: "testpassword"
    }

    await api.post("/api/users").send(newUser).expect(200).expect('Content-Type', /application\/json/)

    const endUsers = await helper.usersInDB()
    expect(endUsers).toHaveLength(initialUsers.length +1)

    const usernames = endUsers.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('user creation fails without a username', async () => {
    const newUser = {
      name: "Test User",
      password: "testpassword"
    }

    await api.post("/api/users").send(newUser).expect(400).expect('Content-Type', /application\/json/)
  })

  test('user creation fails with a password less than 3 characters long', async () => {
    const newUser = {
      name: "Test User",
      username: "testuser",
      password: "1"
    }

    await api.post("/api/users").send(newUser).expect(400).expect('Content-Type', /application\/json/)
  })


})

afterAll(() => {
  mongoose.connection.close();
});
