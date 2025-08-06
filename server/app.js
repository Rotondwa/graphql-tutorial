const express = require("express");
const { graphqlHTTP } = require("express-graphql")
const schema = require("./schema/schema")
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

// connect to mongodb
const DatabaseURL = process.env.DATABASE_URL;
mongoose.connect(DatabaseURL);

// check if the connection is open if not then show error

mongoose.connection.once("open", () => {
    console.log("Mongoose connected to MongoDB successfully");
});


const app = express();

/**
 * GraphQL Middleware
 * This is the endpoint for the GraphQL API
 * graphqlHTTP is a middleware that allows us to use GraphQL with Express
 * schema is the schema of the GraphQL API
 * graphiql is a tool that allows us to test the GraphQL API
 * graphiql: true is a configuration option that allows us to use the GraphiQL tool to test the GraphQL API
 */
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

// Serve
app.listen(3000, () =>
{
    console.log("Server is running on port 3000");
});

module.exports = app;