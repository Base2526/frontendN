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
  useQuery,
  gql
} from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities"

const client = new ApolloClient({
  uri: 'http://localhost:4040/graphql',
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