import gql from "graphql-tag"

export const CREATE_USER = gql`
  mutation createUser($netlifyUserId: String!, $name: String!, $slug: String!) {
    createUser(
      data: { netlifyUserId: $netlifyUserId, name: $name, slug: $slug }
    ) {
      id
    }
  }
`
