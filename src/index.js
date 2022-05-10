
const { ApolloServer, gql } = require('apollo-server-express');
const { MongoClient, ObjectID, ServerApiVersion } = require('mongodb');
const express = require('express');
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

const{ DB_URL, DB_NAME } = process.env;


/*
        testQuery: [item]!
    }
    type item {
        id:ID!
        body: String!
        username: String!
        createAt: String!
*/
// dummy dataset 

const dataset = [
    {
        id: "6272d10c669d25d7c98f3ff7",
        body: "This is from dummy dataset",
        username: "haha1",
        createAt: "Now 5/5/2022 3:17"
    }
]
const typeDefs = gql`
    type Query {
        getItem: [item]
    }
    type item {
        id: ID!
        body: String!
        username: String!
        createAt: String!        
    }
`;

const resolvers = {
    Query: {

        getItem: async (_, __, { collection }) => {
            return await db.collection('MERN')
                                      .find()
                                      .toArray();
        }
    }
}


// const uri = "mongodb+srv://MERNG-SocialMediaApp:<password>@helloworld.8uh3p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("HelloWorld").collection("MERN");
//   // perform actions on the collection object
//   console.log('Connected to MONGODB');
// //   client.close();
// });

const start = async () => {
    // const collection = client.db(DB_NAME).collection('MERN');
  
    // The ApolloServer constructor requires two parameters: your schema
    // definition and your set of resolvers.
    const app = express();
    const server = new ApolloServer({ 
      typeDefs, 
      resolvers, 
    });
    await server.start();
    server.applyMiddleware({ app });
    // The `listen` method launches a web server.
    app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );
};

// const client = new MongoClient(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//       const collection = client.db("HelloWorld").collection("MERN");
//       // perform actions on the collection object
//       console.log('Connected to MONGODB');
//     });

const db = mongoose.connection;
db.on('error', console.error.bind(console, "MongoDB connection failed"));

const connectDB = () => {
    return mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true}, err => {
        if (err){
            console.error('Connection to DB failed');
        } else{
            console.log('Connection to DB was successful');
        }
    })
}
connectDB();

start();