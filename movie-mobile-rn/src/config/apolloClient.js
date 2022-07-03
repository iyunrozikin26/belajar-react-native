import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from "@apollo/client";

const client = new ApolloClient({
    uri: "http://192.168.43.60:4000", // ipconfig pc
    
    cache: new InMemoryCache(),
});

export default client;
