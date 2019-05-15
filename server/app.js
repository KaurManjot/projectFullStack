const express = require('express');
const graphqlHTTP = require('express-graphql');

const app = express();
const schema = require('./schema/schema');
const mongoose = require('mongoose');
//express-graphql: express server that runs the graphql API
//end point to interact with all queries
//import the schema

mongoose.connect('mongodb+srv://kavin:Iys96kav@cluster0-nczbj.mongodb.net/test?retryWrites=true');

mongoose.connection.once('open',()=>{
  console.log('connected to database');
});
app.use('/graphql',graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(3002,() =>{
  console.log('now listening on port 3002');
})
