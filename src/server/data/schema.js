import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} from 'graphql';

import {
  fromGlobalId,
  globalIdField,
  nodeDefinitions,
  mutationWithClientMutationId,
} from 'graphql-relay';

const store = {
  id: 1,
  messages: [{
    id: 1,
    text: 'Hello World'
  }]
};


/**
 * The first argument defines the way to resolve an ID to its object.
 * The second argument defines the way to resolve a node object to its GraphQL type.
 */
var { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    let { id, type } = fromGlobalId(globalId);
    if (type === 'Example')
      return store;
    if (type === 'Message')
      return store.messages[id];
    return null;
  },
  (obj) => store.messages ? messageType : exampleType
);

var messageType = new GraphQLObjectType({
  name: 'Message',
  fields: () => ({
    id: globalIdField('Message'),
    text: {
      type: GraphQLString,
      description: 'The message it yields'
    }
  }),
  interfaces: [ nodeInterface ]
});

var storeType = new GraphQLObjectType({
  name: 'Store',
  fields: () => ({
    id: globalIdField('Example'),
    messages: { type: new GraphQLList(messageType) }
  }),
  interfaces: [ nodeInterface ]
});


var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    id: { type: GraphQLInt },
    example: {
      type: storeType,
      resolve: () => store
    }
  })
});

var messageMutation = mutationWithClientMutationId({
  name: 'CreateMessage',
  inputFields: {
    text: { type: new GraphQLNonNull(GraphQLString) }
  },
  outputFields: {
    store: {
      type: storeType,
      resolve: () => store
    }
  },
  mutateAndGetPayload: ({message}) => {
    var newMessage = { message, id: store.messages.length };
    store.messages.push(newMessage);
    return newMessage;
  }
});

var mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    CreateMessage: messageMutation
  })
});

export var Schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});