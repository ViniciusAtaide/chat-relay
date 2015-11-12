import express from 'express';
import { Schema } from './data/schema';
import graphQLHTTP from 'express-graphql';
import webpack from 'webpack';
import { graphql } from 'graphql';

const app = express();
app.use('/', graphQLHTTP({ schema: Schema, pretty: true }));

app.listen(8080, (err) => {
  if (err)
    return console.error(err);

  //const schema = `
  //  mutation {
  //    CreateMessage(text: $text) {
  //      message {
  //        text
  //      }
  //    }
  //  }`;

  //graphql(Schema, schema)
  //  .then(res => console.log(res));

  console.log('GraphQL Server is now running on localhost:8080');
});