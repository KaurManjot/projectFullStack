//file that describes the schema to query and retrieve data
const graphql = require('graphql');
const _=require('lodash');
const User = require('../models/user')
//ES6 syntax that grapbs the GraphQLObjectType variable from graphql
const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID} = graphql;

// var users =[
//   {id:'1',name:'Kavin',email:'iamkavinarasu@gmail.com',password:'Letmein123'},
//   {id:'2',name:'Kavinarasu',email:'kavin2@pdx.edu',password:'Letmein456'},
// ];

// Three tasks of the schema file 1. declare Type, 2. describe relationship between types, 3. RootQuery
const UserType = new GraphQLObjectType({
  name:'User',
  fields: ()=>({
    id: {type:GraphQLID},
    name: {type:GraphQLString},
    email: {type:GraphQLString},
    password: {type:GraphQLString}
  })
});

//RootQuery: How to jump into the graph to graph the data
//every field represents the particular type of query being executed
//fields is not a function because the relationship between the types doesnt matter
//getUserPassword name that will be used by the frontend to get the data
//args gets the user detail like email for which you have to validate the password.
//getUserPassword(abc@def.com){password} -> accessing from frontend
//resolve-> function to get data from the db
const RootQuery =  new GraphQLObjectType({
  name:'RootQueryType',
  fields: {
    getUserPassword:{
      type:UserType,
      args:{email:{type:GraphQLString}},
      resolve(parent,args){
        // return _.find(users,{email:args.email});
      }
    }
  }
});

//code to insert data in mongodb using mutations. Can be accessed from frontend using the addUser function.

const Mutation = new GraphQLObjectType({
  name:'Mutation',
  fields:{
    addUser:{
      type:UserType,
      args:{
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        email:{type:GraphQLString},
        password:{type:GraphQLString}
      },
      resolve(parent,args){
        let user = new User({
          id:args.id,
          name: args.name,
          email: args.email,
          password: args.password
        });
        return user.save()
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})
