const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    driverLogs: [DriverLog]!
  }

  type DriverLog {
    _id: ID
    total_fill: Int 
    total_cost: Int
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    driverLogs(username: String): [DriverLog]
    driverLog(driverLogId: ID!): DriverLog
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addDriverLog(total_fill: Int!, total_cost: Int!): DriverLog
    removeDriverLog(driverLogId: ID!): DriverLog
  }
`;

module.exports = typeDefs;