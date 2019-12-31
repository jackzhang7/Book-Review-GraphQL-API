const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

// Some fake data
const books = [
  {
    id: '1',
    title: "The Handmaid's Tale",
    author: 'Margaret Atwood',
    genre: 'Speculative Fiction',
    rating: '5.0',
  },
  {
    id: '2',
    title: 'Middlesex',
    author: 'Jeffrey Eugenides',
    genre: 'Literary Fiction',
    rating: '4.0',
  },
  {
    id: '3',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Literary Fiction',
    rating: '4.5',
  },
  {
    id: '4',
    title: 'Alias Grace',
    author: 'Margaret Atwood',
    genre: 'Literary Fiction',
    rating: 'TBD',
  },
  {
    id: '5',
    title: 'Ariel',
    author: 'Sylvia Plath',
    genre: 'Poetry',
    rating: '5.0',
  },
  {
    id: '6',
    title: 'Wicked Plants',
    author: 'Amy Stewart',
    genre: 'Non-Fiction',
    rating: '4.0',
  },
  {
    id: '7',
    title: 'The Red Tent',
    author: 'Anita Diamant',
    genre: 'Literary Fiction',
    rating: '4.5',
  },
  {
    id: '8',
    title: 'Family Ties',
    author: 'Clarice Lispector',
    genre: 'Short Stories',
    rating: '4.5',
  },
];

// The GraphQL schema in string form
const typeDefs = `
  type Query { books: [Book] }
  type Book { id: String, title: String, author: String, genre: String, rating: String }
`;

// The resolvers
const resolvers = {
  Query: { books: () => books },
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Initialize the app
const app = express();

app.use(cors())

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Start the server
app.listen(process.env.PORT || 3000, () => {
  console.log('Go to http://localhost:3000/graphiql to run queries!');
});