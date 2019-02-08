import gql from "graphql-tag"

export const USERS_BY_NETLIFY_USER_ID = gql`
  query userByNetlifyUserId($netlifyUserId: String!) {
    users(where: { netlifyUserId: $netlifyUserId }) {
      id
    }
  }
`
