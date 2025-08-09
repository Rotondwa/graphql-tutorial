const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");
const _ = require("lodash");
const Book = require("../models/book");
const Author = require("../models/author");

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
       // return _.find(authors, { id: parent.authorId });
       return Author.findById(parent.authorId);
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
           // return _.filter(books, {authorId: parent.id})
           return Book.find({authorId: parent.id});
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
        return Book.findById(args.id);
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return Author.findById(args.id);
      },
    },
    books: {
        type: new GraphQLList(BookType),
        resolve: (parent, args) => {
            return Book.find();
        }
    },
    authors: {
        type: new GraphQLList(AuthorType),
        resolve: (parent, args) => {
            return Author.find();
        }
    }
  },
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve: (parent, args) => {
                let author = new Author(
                    {
                        name: args.name,
                        age: args.age,
                    }
                );
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve: (parent, args) => {
                let book = new Book(
                    {
                        name: args.name,
                        genre: args.genre,
                        authorId: args.authorId,
                    }
                );
               return book.save();
            }
        },
        deleteAuthor: {
            type: AuthorType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve: (parent, args) => {
                return Author.findByIdAndDelete(args.id);
            }
        },
        deleteBook: {
            type: BookType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve: (parent, args) => {
                return Book.findByIdAndDelete(args.id);
            }
        },
        updateAuthor: {
            type: AuthorType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) }, name: { type: new GraphQLNonNull(GraphQLString) }, age: { type: new GraphQLNonNull(GraphQLInt) } },
            resolve: (parent, args) => {
                return Author.findByIdAndUpdate(args.id, { name: args.name, age: args.age }, { new: true });
            }
        },
        updateBook: {
            type: BookType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) }, name: { type: new GraphQLNonNull(GraphQLString) }, genre: { type: new GraphQLNonNull(GraphQLString) } },
            resolve: (parent, args) => {
                return Book.findByIdAndUpdate(args.id, { name: args.name, genre: args.genre }, { new: true });
            }
        }
    }
})

// Export the schema
// this helps us to use the schema in the app.js file
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
