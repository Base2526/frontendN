import { useEffect, useState } from 'react';
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

export const useConfigClient = () => {

    useEffect(()=>{
        console.log("useConfigClient")
    }, [])

    const token = localStorage.getItem('token');

    const authLink = setContext((_, { headers }) => {
        // get the authentication token from local storage if it exists
        
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

    let activeSocket, timedOut;

    const wsLink = new GraphQLWsLink(createClient({
        url: 'ws://localhost:4000/graphql',
        disablePong: false,
        connectionParams: {
            authToken: token,
            textHeaders: "axxxx2"
        },
        on: {
            // connected: () => console.log("connected client"),
            closed: () =>{
            console.log("closed")
            activeSocket =null
            } ,
            connected: (socket) =>{
            activeSocket = socket

            console.log("connected client ", socket)
            },
            keepAlive: 1, // ping server every 10 seconds
            ping: (received) => {
            console.log("#0")
            if (!received) // sent
                console.log("#1")
                timedOut = setTimeout(() => {
                if (activeSocket.readyState === WebSocket.OPEN){
                    activeSocket.close(4408, 'Request Timeout');
                }

                console.log("#2")
                    
                }, 5_000); // wait 5 seconds for the pong and then close the connection
            },
            pong: (received) => {
            console.log("#4")
            if (received){
                console.log("#3")
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
        authLink.concat(httpLink)
    );

    return new ApolloClient({
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
}