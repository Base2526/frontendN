import { StrictMode } from "react";
import ReactDOM from "react-dom";

//////////////// redux /////////////////
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";    // Logger with default options

// persist
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter, Switch } from "react-router-dom";

import reducers from "./redux/reducers";

const persistConfig = {
  key: "root",
  storage,
};

const reducer = persistReducer(persistConfig, reducers);
// persist

// https://github.com/LogRocket/redux-logger/issues/6
const logger = createLogger({
  predicate: () => process.env.NODE_ENV !== "development",
  // predicate: () => process.env.NODE_ENV !== 'production'
});

// thunk
const store = createStore(reducer, applyMiddleware(thunk, logger));
const persistor = persistStore(store);
//////////////// redux /////////////////

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,

  split, HttpLink
} from "@apollo/client";
import { relayStylePagination, getMainDefinition } from "@apollo/client/utilities"
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';

// import { WebSocketLink } from "@apollo/client/link/ws";

import { createClient } from 'graphql-ws';

import { WebSocketLink } from "@apollo/client/link/ws";
import { SubscriptionClient } from "subscriptions-transport-ws";


// const httpLink = createHttpLink({
//   uri: 'http://localhost:4000/graphql'
// });

const token = localStorage.getItem('token');

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});


/////////////////////////
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
});

// authLink.concat(httpLink)


const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:4000/graphql',
  connectionParams: {
    authToken: token,
  },
  on: {
    connected: () => console.log("connected client"),
    closed: () => console.log("closed"),
  },
}));

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  // httpLink,
  authLink.concat(httpLink)
);


////////////////////////



const client = new ApolloClient({
  // uri: 'http://localhost:4040/graphql',
  link: splitLink,
  // link: new WebSocketLink({
  //   uri: 'wss://localhost:4040/graphql',
  //   options: {
  //     reconnect: true,
  //     connectionParams: {
  //       headers: {
  //         Authorization: token ? `Bearer ${token}` : "",
  //       }
  //     }
  //   }
  // }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          books: relayStylePagination(),
        },
      },
    },
  }),
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors)
    console.log("networkError", networkError)
  },
  debug: true
})

import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ApolloProvider client={client}>
        <StrictMode>
          <App />
        </StrictMode>
      </ApolloProvider>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);