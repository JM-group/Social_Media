var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var LikesModel = require('../../models/likes.js');
var PostModel = require('../../models/posts.js');
var CommentsModel = require('../../models/comments.js');
var ShareModel = require('../../models/shares.js');
var UserModel = require('../../../user_service/models/user.js');
var postLikesType = require('../types/timeline').postLikesType;
var postContent = require('../types/posts');
var feedContent = require('../types/feeds')
var GraphQLNumber = require('graphql').GraphQLInt;


exports.feeds_data = {
    type: new GraphQLList(feedContent.feedPageContent),
    args: {
        _id: {
          name: '_id',
          type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: async function (root, params) {
      const filter_query = {_id: params._id};
      var response_val = '';
      const post_data = await PostModel.find({post_type: 1}).then(respo => {
        response_val = respo;
      });
      console.log("..s.as..as.a........");
      console.log(response_val);
      if (!response_val) {
        throw new Error('Error')
      }
      return response_val
    }
}




