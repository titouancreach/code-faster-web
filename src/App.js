import React from 'react'

import {ApolloProvider} from 'react-apollo'
import {ApolloClient} from 'apollo-client'
import {HttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'

import Layout from './Layout'

const GITHUB_BASE_URL = 'https://api.github.com/graphql'
const cache = new InMemoryCache()

const httpLink = new HttpLink({
  uri: GITHUB_BASE_URL,
  headers: {
    authorization: `Bearer ${
      process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
    }`,
  },
})

const client = new ApolloClient({
  link: httpLink,
  cache,
})
function App() {
  return (
    <ApolloProvider client={client}>
      <Layout />
    </ApolloProvider>
  )
}

export default App
