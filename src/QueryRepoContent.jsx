import CodeFaster from './CodeFaster'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import React from 'react'

const query = gql`
  {
    repository(owner: "titouancreach", name: "portfolio") {
      object(expression: "master:README.md") {
        ... on Blob {
          text
        }
      }
    }
  }
`

function QueryRepoContent({ className }) {
  return (
    <Query query={query}>
      {({ loading, error, data }) => {
        if (!error && !loading) {
          return (
            <CodeFaster
              content={data.repository.object.text}
              className={className}
            />
          )
        }
        return null
      }}
    </Query>
  )
}

export default QueryRepoContent
