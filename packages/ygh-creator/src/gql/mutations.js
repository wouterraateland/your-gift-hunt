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

export const UPDATE_ENTITY_INSTANCE_FIELD = gql`
  mutation updateEntityInstanceField(
    $entityInstanceFieldId: ID!
    $value: String!
  ) {
    updateEntityInstanceField(
      where: { id: $entityInstanceFieldId }
      data: { value: $value }
    ) {
      field {
        id
      }
    }
  }
`
