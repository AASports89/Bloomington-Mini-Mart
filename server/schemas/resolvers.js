const { AuthenticationError } = require('apollo-server-express');
const { User, DriverLog } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {

//*******************************| PULL MODEL DATA |*******************************//

  Query: {
    users: async () => {
      return User.find().populate('driverLogs');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('driverLogs');
    },
    driverLog: async (parent, { driverLogId }) => {
      return DriverLog.findOne({ _id: driverLogId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("driverLogs");
      }
      throw new AuthenticationError("Please login❗⛔");
    },
  },

//*******************************| CHANGE MODEL DATA |*******************************//

Mutation: {

//*******************************| CREATE USER |*******************************//
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Error❗⛔ No user found with this login❗⛔');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Error❗⛔ Invalid login credentials❗⛔');
      }

      const token = signToken(user);

      return { token, user };
    },

//*******************************| ADD DRIVER LOG |*******************************//

    addDriverLog: async (parent, { total_fill, total_cost }, context) => {
      if(context.user) {
        const driverLog = await DriverLog.create({ 
          total_fill,
          total_cost,
          username: context.user.username,
        });

      await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { driverLogs: driverLog._id, username: context.user.username } },
          {
            new: true,
            runValidators: true,
          }
        );
        return driverLog;
      }
      throw new AuthenticationError("Error❗⛔ Please login to set driver log❗⛔");
    },

//*******************************| DELETE DRIVER LOG |*********************************//

    removeDriverLog: async (parent, { driverLogId }, context) => {
      if(context.user) {
        const driverLog = await DriverLog.findOneAndDelete({
          _id: driverLogId,
          username: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { driverLogs: driverLog._id }}
        );
        return driverLog;
      }
      throw new AuthenticationError("Error❗⛔ Please login to delete driver log❗⛔");
    },
  },
};

module.exports = resolvers;