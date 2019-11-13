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
        },
        first:{
          name:"first",
          type: new GraphQLNonNull(GraphQLString)
        },
        after:{
          name:"after",
          type: new GraphQLNonNull(GraphQLString)
        },
        move:{
          name:"move",
          type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: async function (root, params) {
      const filter_query = {_id: params._id};
      console.log("params value here issss ==", params.first);
      console.log(params.after);
      console.log(params);
      //var cursorNumeric =  parseInt(Buffer.from(params.after,'base64').toString('ascii'));
      var cursorNumeric = params.after, hasNextPageFlag = false;
      console.log('cursor numeric value going on hereeeeee issss ======== 888888888888888888');
      console.log(cursorNumeric);
      if (!cursorNumeric) cursorNumeric = 0;
      var response_val = '';
      if (cursorNumeric != 0 && params.move == "2") {
        console.log("inside 11111111111");
        const post_data = await PostModel.find({post_type: 1}).where('_id').gt(cursorNumeric).then(respo => {
          response_val = [respo[0]];
          //response_val['cursor'] = respo[0]._id; 
          if (respo[1] && respo[1]._id) {
            hasNextPageFlag = true;
          }
        });
      } else if (cursorNumeric != 0 && params.move == "1") {
        console.log("inside 2222222222222222");
        const post_data = await PostModel.find({post_type: 1}).where('_id').lt(cursorNumeric).then(respo => {
          console.log("resp.length value issss ==", respo.length)
          response_val = [respo[respo.length - 1]];
          //response_val['cursor'] = respo[0]._id; 
          if (respo[1] && respo[1]._id) {
            hasNextPageFlag = true;
          }
        });
      } else {
        const post_data = await PostModel.find({post_type: 1}).where('_id').then(respo => {
          console.log("resp.length value issss ==", respo.length)
          response_val = [respo[0]];
          //response_val['cursor'] = respo[0]._id; 
          if (respo[1] && respo[1]._id) {
            hasNextPageFlag = true;
          }
        });
      }
      response_val[0]['has_next_page_flag'] = hasNextPageFlag;
      response_val[0]['cursor'] = response_val[0]._id;
      if (!response_val) {
        throw new Error('Error')
      }
      return response_val
    }
}




