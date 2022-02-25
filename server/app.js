const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('../schema/schema.js');
const mongoose = require('mongoose');
const { connectToMongo } = require('./db/connection');
const cors = require('cors');

const app = express();
const PORT = 3005;
require('dotenv').config();

app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

app.listen(PORT, async (err) => {
    await connectToMongo()
    err ? console.log(error) : console.log('Server started!')
});