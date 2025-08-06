const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = require("graphql");
const _ = require("lodash");

 // Dummy data array for books
const books = [
    { id: "1", name: "Book1", genre: "Genre1", authorId: "1" },
    { id: "2", name: "Book2", genre: "Genre2", authorId: "2" },
    { id: "3", name: "Book3", genre: "Genre3", authorId: "3" },
    { id: "4", name: "Book4", genre: "Genre4", authorId: "2" },
    { id: "5", name: "Book5", genre: "Genre5", authorId: "1" },
    { id: "6", name: "Book6", genre: "Genre6", authorId: "2" },
  ];
  
  const authors = [
    { id: "1", name: "Author1 Doe", age: 30 },
    { id: "2", name: "Author2 Smith", age: 31 },
    { id: "3", name: "Author3 Johnson", age: 32 },
  ];
// Define the Book schema
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    authorId: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve: (parent, args) => {
        return _.find(authors, { id: parent.authorId });
      },
    },
  }),
});

// Define the Author schema
const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
        type: new GraphQLList(BookType),
        resolve: (parent, args) => {
            return _.filter(books, {authorId: parent.id})
        },
    }
  }),
});



/**
 * Define the Root Query Type
 * This is the root query type for the GraphQL API
 * It is the entry point for all queries
 * for example, if we do not have a root query type, we cannot query the book
 */

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        // Code to get data from database - any database type can be used
        // for example, we can use a database like MongoDB, PostgreSQL, etc.
        // for now, we will use a simple array of books
        let book = _.find(books, { id: args.id });
        return book;
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        let author = _.find(authors, { id: args.id });
        return author;
      },
    },
  },
});



// Export the schema
// this helps us to use the schema in the app.js file
module.exports = new GraphQLSchema({
  query: RootQuery,
});
