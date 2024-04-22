import './style.css';
import { Amplify } from 'aws-amplify';
import amplifyconfig from './src/amplifyconfiguration.json';

import { generateClient } from 'aws-amplify/api';
import { createTodo } from './src/graphql/mutations';
import { listTodos } from './src/graphql/queries';
import { onCreateTodo } from './src/graphql/subscriptions';
import { generateClient } from 'aws-amplify/api';
import { createTodo, updateTodo, deleteTodo } from '/Users/juliadingee/TaskMaster/vite-project/src/graphql/mutations.js';
import { listTodos } from '/Users/juliadingee/TaskMaster/vite-project/src/graphql/queries.js';
Amplify.configure(amplifyconfig);



const MutationButton = document.getElementById('MutationEventButton');
const MutationResult = document.getElementById('MutationResult');
const QueryResult = document.getElementById('QueryResult');
const SubscriptionResult = document.getElementById('SubscriptionResult');

const client = generateClient();

const result = await client.graphql({
  query: createTodo,
  variables: {
    input: {
      name: 'My first todo!',
      description: ,
      date: ,

    }
  }
});



const result = await client.graphql({ query: listTodos });
console.log(result);

const result = await client.graphql({
  query: updateTodo,
  variables: {
    input: {
      id: '<...>',
      name: 'My first updated todo!'
    }
  }
});
console.log(result);

const result = await client.graphql({
  query: deleteTodo,
  variables: {
    input: {
      id: '<...>'
    }
  }
});
console.log(result);

subscribeToNewTodos();
fetchTodos();