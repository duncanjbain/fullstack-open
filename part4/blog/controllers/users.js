const bcrypt = require('bcrypt')
const usersRouter = require('express').Router();
const User = require('../models/users')

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if(body.password.length >= 3) {
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const newUser = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await newUser.save();

  return response.json(savedUser)
  }

  return response.status(400).json({ error: 'password must be a minimum of 3 characters'})

})

usersRouter.get("/", async(request, response) => {
  const users = await User.find({})
  response.json(users)
})

module.exports = usersRouter