var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var queryType = require('./queries/timeline').postLikesList;
//var mutation = require('./mutations/index');

exports.timelineSchema = new GraphQLSchema({
  query: queryType,
/*  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: mutation
  })  */ 
})