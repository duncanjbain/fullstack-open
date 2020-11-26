const { ApolloServer, gql, UserInputError } = require("apollo-server");
const jwt = require('jsonwebtoken')
const mongoose = require("mongoose");
require("dotenv").config();
const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user")


const JWT_SECRET = 'jwt_secret'
const MONGODB_URI = process.env.MONGODB_URI;
console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }
  type Author {
    name: String!
    id: ID!
    bookCount: Int!
    born: Int
  }
  type Query {
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author!]!
    bookCount: Int!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(
      username: String!,
      favoriteGenre: String!,
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`;

const resolvers = {
  Query: {
    authorCount: async () => await Author.collection.countDocuments(),
    bookCount: async () => await Book.collection.countDocuments(),
    allBooks: async () => await Book.find({}).populate('author'),
    allAuthors: async () => await Author.find({}),
  },
  Author: {
    bookCount: async ({name}) => {
      console.log(name)
      const author = await Author.findOne({name}).select('_id');
      return Book.find({ author }).countDocuments();
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = new Author({ name: args.author });
        try {
          author = await author.save();
        } catch (error) {
          throw new UserInputError(error.message, { invalidArgs: args });
        }
      }
      const book = new Book({
        title: args.title,
        author: author,
        published: args.published,
        genres: args.genres,
      });
      try {
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }

      await book.populate('author')
      return book;
    },
    editAuthor: async (root,args) => {
      const author = await Author.findOneAndUpdate({name: args.name},{born: args.setBornTo})
      return author
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre
      })
      try {
       return await user.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args})
      }
    },
    login: async (root,args) => {
      const user = await User.findOne({username: args.username})
      if(!user || args.password !== "hardcodedpassword") {
        throw new UserInputError("Wrong username/password")
      }
      
      const userForToken = {
        username: user.name,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET)}
    }
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
