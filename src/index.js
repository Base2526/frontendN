import { StrictMode } from "react";
import ReactDOM from "react-dom";

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

const rootElement = document.getElementById("root");
ReactDOM.render(
  <ApolloProvider client={client}>
    <StrictMode>
      <App />
    </StrictMode>
  </ApolloProvider>,

  rootElement
);