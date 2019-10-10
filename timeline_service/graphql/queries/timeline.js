var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var LikesModel = require('../../models/likes.js');
var postLikesType = require('../types/timeline').postLikesType;
var GraphQLNumber = require('graphql').GraphQLInt;

// Query
exports.postLikesList = new GraphQLObjectType({
  name: 'Query',
  fields: function () {
    return {
      post_likes_list: {
        type: new GraphQLList(postLikesType),
        args: {
            post_id: {
              name: 'post_id',
              type: new GraphQLNonNull(GraphQLString)
            }
        },
        resolve: function (root, params) {
          const filter_query = {post_id: params.post_id};
          const likes = LikesModel.find(filter_query).exec()
          if (!likes) {
            throw new Error('Error')
          }
          return likes
        }
      },
      comments_like_list: {
        type: new GraphQLList(postLikesType),
        args: {
            post_id: {
              name: 'post_id',
              type: new GraphQLNonNull(GraphQLString)
            },
            comment_id: {
              name: 'comment_id',
              type: new GraphQLNonNull(GraphQLString)              
            }
        },
        resolve: function (root, params) {
          const filter_query = {post_id: params.post_id, comment_id: params.comment_id};
          const likes = LikesModel.find(filter_query).exec()
          if (!likes) {
            throw new Error('Error')
          }
          return likes
        }
      }
    }
  }
}); 



/*

exports.postLikesList = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    hello: {
      type: GraphQLString,
      resolve() {
        return "world";
      }
    },
    person: {
      type: GraphQLString,
      resolve() {
        return "world2";
      }
    },
    people: {
      type: GraphQLString,
      resolve() {
        return "world3";
      }
    }
  }
});

*/