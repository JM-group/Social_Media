var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLNumber = require('graphql').GraphQLInt;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLArray = require('graphql').GraphQLArray;
var GraphQLJSON = require('graphql-type-json').GraphQLJSON;

// User Type
exports.userFollowerContent = new GraphQLObjectType({
  name: 'follower',
  fields: function () {
    return {
      friends: {
        type: new GraphQLList(GraphQLJSON), 
      },
      user: {
        type: userContentType,
        resolve: function(root, params) {
          return root.user[0] 
        }       
      },
      friends_list: {
        type: new GraphQLList(GraphQLJSON),      
      } 
    }
  }
});



const userContentType = new GraphQLObjectType({
  name: 'user_data',
  fields: function () {
    return {
      _id: {type: GraphQLString,
          /*  resolve: function(root, params) {
              
          } */
      },
      email: {type: GraphQLString},
      profile_pic: {type: GraphQLString}
    }
  } 
});



      //type: userContentType,
        //  resolve: function (root, params) {
        //    return root.likes[0] 
        //}


        //      const result = input.map(userPayload => createUser(userPayload));
      //        return result;