import React from "react";
import {ApolloClient, InMemoryCache} from "@apollo/client";

const client = new ApolloClient({
    cache: new InMemoryCache(
        {
            typePolicies: {
                UnconventionalRootQuery: {
                    // The RootQueryFragment can only match if the cache knows the __typename
                    // of the root query object.
                },
            },
        }
    ),
    uri: "http://localhost:5000/graphql"
})

export default client;