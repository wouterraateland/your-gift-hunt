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

export const UPDATE_USER_SLUG = gql`
  mutation updateUserSlug($userId: ID!, $slug: String!) {
    updateUser(where: { id: $userId }, data: { slug: $slug }) {
      id
      slug
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

export const CREATE_GAME = gql`
  mutation createGame(
    $name: String!
    $slug: String!
    $description: String
    $creatorId: ID!
    $privacy: PrivacyType!
    $accessType: AccessType!
    $accessCode: String
  ) {
    createGame(
      data: {
        name: $name
        slug: $slug
        description: $description
        creator: { connect: { id: $creatorId } }
        privacy: $privacy
        accessType: $accessType
        accessCode: $accessCode
      }
    ) {
      id
    }
  }
`

export const UPDATE_GAME = gql`
  mutation updateGame($gameId: ID!, $values: GameUpdateInput!) {
    updateGame(where: { id: $gameId }, data: $values) {
      id
      name
      description
    }
  }
`

export const UPDATE_INSTANCE_NAME = gql`
  mutation updateInstanceName($instanceId: ID!, $name: String!) {
    updateEntityInstance(where: { id: $instanceId }, data: { name: $name }) {
      id
      name
    }
  }
`
