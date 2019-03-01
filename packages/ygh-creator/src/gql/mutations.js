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
        cooperators: { connect: [{ id: $creatorId }] }
        privacy: $privacy
        accessType: $accessType
        accessCode: $accessCode
      }
    ) {
      id
      name
      slug
      createdAt
      updatedAt
      creator {
        id
        name
        slug
      }
    }
  }
`

export const UPDATE_GAME_SETTINGS = gql`
  mutation updateGame($gameId: ID!, $values: GameUpdateInput!) {
    updateGame(where: { id: $gameId }, data: $values) {
      id
      name
      description
      accessType
      accessCode
    }
  }
`

export const DELETE_GAME = gql`
  mutation deleteGame($gameId: ID!) {
    deleteGame(where: { id: $gameId }) {
      id
    }
  }
`

export const UPDATE_ENTITY_INSTANCE_NAME = gql`
  mutation updateEntityInstanceName($instanceId: ID!, $name: String!) {
    updateEntityInstance(where: { id: $instanceId }, data: { name: $name }) {
      id
      name
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
      id
      value
    }
  }
`

export const CONNECT_ACTION_REQUIREMENT_TO_ENTITY_INSTANCE = gql`
  mutation connectActionRequirementToEntityInstance(
    $entityInstanceId: ID!
    $actionRequirementId: ID!
  ) {
    updateEntityInstance(
      where: { id: $entityInstanceId }
      data: {
        actionRequirementsWithCustomHints: {
          connect: [{ id: $actionRequirementId }]
        }
      }
    ) {
      id
      actionRequirementsWithCustomHints {
        id
      }
    }
  }
`

export const DISCONNECT_ACTION_REQUIREMENT_FROM_ENTITY_INSTANCE = gql`
  mutation disconnectActionRequirementFromEntityInstance(
    $entityInstanceId: ID!
    $actionRequirementId: ID!
  ) {
    updateEntityInstance(
      where: { id: $entityInstanceId }
      data: {
        actionRequirementsWithCustomHints: {
          disconnect: [{ id: $actionRequirementId }]
        }
      }
    ) {
      id
      actionRequirementsWithCustomHints {
        id
      }
    }
  }
`

export const CREATE_HINT = gql`
  mutation createHint(
    $entityInstanceId: ID!
    $actionRequirementId: ID!
    $text: String!
    $delay: Int
  ) {
    createHint(
      data: {
        text: $text
        delay: $delay
        entityInstance: { connect: { id: $entityInstanceId } }
        actionRequirement: { connect: { id: $actionRequirementId } }
      }
    ) {
      id
      text
      delay
      entityInstance {
        id
      }
      actionRequirement {
        id
      }
    }
  }
`

export const UPDATE_HINT = gql`
  mutation updateHint($hintId: ID!, $text: String!, $delay: Int) {
    updateHint(where: { id: $hintId }, data: { text: $text, delay: $delay }) {
      id
      text
      delay
    }
  }
`

export const DELETE_HINT = gql`
  mutation deleteHint($hintId: ID!) {
    deleteHint(where: { id: $hintId }) {
      id
    }
  }
`
