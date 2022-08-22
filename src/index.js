import { StrictMode } from "react";
import ReactDOM from "react-dom";

//////////////// redux /////////////////
import { applyMiddleware, legacy_createStore as createStore, combineReducers  } from "redux";
import { configureStore } from '@reduxjs/toolkit'
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

import { createUploadLink } from 'apollo-upload-client' // v15.0.0


// import { WebSocketLink } from "@apollo/client/link/ws";
// import { SubscriptionClient } from "subscriptions-transport-ws";

import {ls_connecting} from "./redux/actions/ws"


// const httpLink = createHttpLink({
//   uri: 'http://localhost:4000/graphql'
// });



const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists

  let token = localStorage.getItem('token');

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      textHeaders: "axxxx1"
    }
  }
});


/////////////////////////
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
});

// authLink.concat(httpLink)

const connecting = (status) =>{
  let {ws} = store.getState()
  if(ws){
    ws.is_connnecting === status ? "" : store.dispatch(ls_connecting(status));
  }
}

let activeSocket, timedOut;

let restartRequestedBeforeConnected = false;
let gracefullyRestart = () => {
  restartRequestedBeforeConnected = true;
};

const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:4000/graphql',
  // reconnect: true,
  disablePong: false,
  connectionAckWaitTimeout: 0,
  retryAttempts: 5,
  keepAlive: 10_000,
  retryWait: async function randomisedExponentialBackoff(retries) {

    console.log("wsLink retryWait")
    let retryDelay = 1000; // start with 1s delay
    for (let i = 0; i < retries; i++) {
      retryDelay *= 2;
    }
    await new Promise((resolve) =>
      setTimeout(
        resolve,
        retryDelay +
          // add random timeout from 300ms to 3s
          Math.floor(Math.random() * (3000 - 300) + 300),
      ),
    );
  },
  shouldRetry: (errOrCloseEvent) => {
    console.log("wsLink shouldRetry :")
    return true;
  },
  connectionParams: {
    authToken: localStorage.getItem('token'),
    textHeaders: "axxxx2"
  },
  on: {
    // connected: () => console.log("connected client"),
    connecting: () => {
      // this.setState({ socketStatus: 'connecting' });
      // console.log("wsLink connecting");

      connecting(true)
    },
    closed: () =>{
      // console.log("wsLink closed");
      activeSocket =null
      connecting(false)
    } ,
    connected: (socket) =>{
      activeSocket = socket

      // console.log("wsLink connected client", socket);

      // gracefullyRestart = () => {
      //   if (socket.readyState === WebSocket.OPEN) {
      //     socket.close(4205, 'Client Restart');

      //     console.log("gracefullyRestart #1")
      //   }
      // };

      // // just in case you were eager to restart
      // if (restartRequestedBeforeConnected) {
      //   restartRequestedBeforeConnected = false;
      //   gracefullyRestart();

      //   console.log("gracefullyRestart #2")
      // }
    },
    keepAlive: 10, // ping server every 10 seconds
    ping: (received) => {
      console.log("wsLink #0")

      if (!received){
        console.log("#1")
        timedOut = setTimeout(() => {
          if (activeSocket.readyState === WebSocket.OPEN){
            activeSocket.close(4408, 'Request Timeout');
          }
            
        }, 5_000); // wait 5 seconds for the pong and then close the connection
      } // sent
    },
    pong: (received) => {
      console.log("wsLink #4")

      if (received){
        clearTimeout(timedOut); // pong is received, clear connection close timeout
      } 
    },
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
  // authLink.concat(httpLink),
  createUploadLink({ uri: 'http://localhost:4000/graphql', headers:{ authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : "", } })
);

// const link = createUploadLink({ uri: "http://localhost:4000/graphql" });
const client = new ApolloClient({
  // uri: 'http://localhost:4040/graphql',
  link: splitLink,
  request: (operation) => {
    console.log("request >>>>>>>  ", operation)
  },
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

// import { useConfigClient } from './useConfigClient'; 
// console.log("useConfigClient :", useConfigClient())


//////////////////////////////////


/////////////////////////////////


ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <StrictMode>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </StrictMode>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);