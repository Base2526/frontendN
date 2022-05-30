import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// const apolloClient = new ApolloClient({
//   uri: "https://atomizedobjects.com/i-am-an-example",
//   cache: new InMemoryCache()
// });

// export {
//   apolloClient
// } 


export const apolloClient = () => {
  return new ApolloClient({
      uri: 'http://localhost:4040/graphql',
      cache: new InMemoryCache(),
      // link: createUploadLink(),
      // debug: true
  });
}