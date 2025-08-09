const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("Missing DATABASE_URL environment variable");
  process.exit(1);
}

const app = express();
app.use(cors());

mongoose
  .connect(databaseUrl)
  .then(() => {
    console.log("Mongoose connected to MongoDB successfully");
    app.use(
      "/graphql",
      graphqlHTTP({
        schema,
        graphiql: process.env.NODE_ENV !== "production",
      })
    );
    const port = process.env.PORT ? Number(process.env.PORT) : 4000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Mongoose connection error:", error);
    process.exit(1);
  });

module.exports = app;