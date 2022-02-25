const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('../schema/schema.js');
const mongoose = require('mongoose');
const { connectToMongo } = require('./db/connection')

const app = express();
const PORT = 3005;
require('dotenv').config()

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));
app.listen(PORT, async (err) => {
    await connectToMongo()
    err ? console.log(error) : console.log('Server started!')
});