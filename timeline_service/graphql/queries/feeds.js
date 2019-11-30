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
const auth = require('../../middleware/graphql_auth.js');


exports.feeds_data = {
    type: new GraphQLList(feedContent.feedPageContent),
    args: {
        _id: {
          name: '_id',
          type: new GraphQLNonNull(GraphQLString)
        },
        token: {
          name: 'token',
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
      //console.log("params value here issss ==", params.first);
      //console.log(params.after);
      console.log(params);
      //var cursorNumeric =  parseInt(Buffer.from(params.after,'base64').toString('ascii'));
      var cursorNumeric = params.after, hasNextPageFlag = false, hasPrevPageFlag = false, 
      userLiked = false, postedUserProfPic = null, postedUserEmail = null;
      console.log('cursor numeric value going on hereeeeee issss ======== 888888888888888888');
      console.log(cursorNumeric);
      if (!cursorNumeric) cursorNumeric = 0;
      var response_val = '';
      if (Number(cursorNumeric) != 0 && params.move == "2") {
        //console.log("inside 11111111111");
        const post_data = await PostModel.find({post_type: 1}).where('_id').gt(cursorNumeric).then(respo => {
          response_val = [respo[0]];
          //response_val['cursor'] = respo[0]._id; 
          hasPrevPageFlag = true;
          if (respo[1] && respo[1]._id) {
            hasNextPageFlag = true;
          }
        });
      } else if (Number(cursorNumeric) != 0 && params.move == "1") {
        console.log("inside 2222222222222222");
        const post_data = await PostModel.find({post_type: 1}).where('_id').lt(cursorNumeric).then(respo => {
          console.log("resp.length value issss ==", respo.length)
          response_val = [respo[respo.length - 1]];
          //response_val['cursor'] = respo[0]._id; 
          hasNextPageFlag = true;
          if (respo[respo.length - 2] && respo[respo.length - 2]._id) {
            hasPrevPageFlag = true;
          }
        });
      } else {
        const post_data = await PostModel.find({post_type: 1}).where('_id').then(respo => {
          //console.log("resp.length value issss ==", respo.length)
          response_val = [respo[0]];
          //response_val['cursor'] = respo[0]._id; 
          if (respo[1] && respo[1]._id) {
            hasNextPageFlag = true;
          }
        });
      }
      console.log("befre params.token check heree ==");
      if (params.token) {
        console.log("after crossing token value here issssssss");
        var user = await auth(params)
        //console.log("123344455667788990 /////////////////");
        console.log("user_id value ==", user);
        console.log(response_val[0]._id);
        if (user) {
          console.log("inner 111");
          const like_check = await LikesModel.find({$and:[{media_id: "0", comment_id: "0", 
              parent_comment_id: "0", post_id: response_val[0]._id, liked_by: user._id}]}).then(respo => {
            // console.log(respo)  
              console.log("inner value hereeeeeee iiififfifififififi");
              console.log(respo);
              if(respo && respo[0]) {
                console.log("777777778888888899999999000000");
                userLiked = true;
              }
          });
        } else {
            console.log("inner 222");
            userLiked = false;
        }  
      } else {
        userLiked = false;
      }
      if (response_val && response_val[0] && response_val[0].user_id) {
        console.log("inside posted user check if condition value hereeeeeee");
        //console.log(response_val[0].user_id)
        const user_data = await UserModel.findById(response_val[0].user_id).then(respo => {
          //console.log("val val val 11111111");
          //console.log(respo)
          if (respo) {
            if (respo.profile_pic) {
              postedUserProfPic = "http://70.54.78.237/" + respo.profile_pic
            }  
            postedUserEmail = respo.email
          }
        });  
      }
      console.log("befire fial ==,");
      console.log(response_val[0]);
      response_val[0]['has_next_page_flag'] = hasNextPageFlag;
      response_val[0]['has_prev_page_flag'] = hasPrevPageFlag;
      response_val[0]['cursor'] = response_val[0]._id;
      response_val[0]['user_liked'] = userLiked; //To identify whether particular user liked or not
      response_val[0]['posted_user_prof_pic'] = postedUserProfPic;
      response_val[0]['posted_user_email'] = postedUserEmail;
      console.log(response_val);
      //console.log("id value here iss ==", response_val[0]._id);
      if (!response_val) {
        throw new Error('Error')
      }
      return response_val
    }
}




