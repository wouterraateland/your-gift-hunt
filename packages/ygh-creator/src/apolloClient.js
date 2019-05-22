import ApolloClient from "apollo-boost"

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URL,
  request: async operation =>
    operation.setContext({
      headers: {
        authorization: `Bearer ${process.env.REACT_APP_GRAPHQL_TOKEN}`
      }
    })
})

export default client
