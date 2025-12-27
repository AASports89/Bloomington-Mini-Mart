const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../User.js');
const { signToken } = require('../auth.js');

const resolvers = {
//PULL MODEL DATA//
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("Please login❗⛔");
    },
  },
//CHANGE MODEL DATA//
  Mutation: {
//CREATE USER//
    addUser: async (parent, { username, password }) => {
      const user = await User.create({ username, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError('Error❗⛔ ' + username + ' NOT found with this login❗⛔');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Error❗⛔ ' + username + "'s login credentials INVALID❗⛔");
      }

      const token = signToken(user);

      return { token, user };
    },
//ADD PARLAY//
    // addParlay: async (parent, { win_choice }, context) => {
    //   if(context.user) {
    //     const parlay = await Parlay.create({ 
    //       win_choice,
    //       username: context.user.username,
    //     });

    //   await User.findOneAndUpdate(
    //       { _id: context.user._id },
    //       { $addToSet: { parlays: parlay._id, username: context.user.username } },
    //       {
    //         new: true,
    //         runValidators: true,
    //       }
    //     );
    //     return parlay;
    //   }
    //   throw new AuthenticationError("Error❗⛔ Please login to set parlay❗⛔");
    // },
//DELETE PARLAY//
    // removeParlay: async (parent, { parlayId }, context) => {
    //   if(context.user) {
    //     const parlay = await Parlay.findOneAndDelete({
    //       _id: parlayId,
    //       username: context.user.username,
    //     });

    //     await User.findOneAndUpdate(
    //       { _id: context.user._id },
    //       { $pull: { parlays: parlay._id }}
    //     );
    //     return parlay;
    //   }
    //   throw new AuthenticationError("Error❗⛔ Please login to delete parlay❗⛔");
    // },
}};

module.exports = resolvers;