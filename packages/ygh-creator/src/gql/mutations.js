import gql from "graphql-tag"
import { ENTITY_INSTANCE_FRAGMENT, INFORMATION_FRAGMENT } from "./fragments"

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
  mutation updateFieldValue($FieldValueId: ID!, $value: String!) {
    updateFieldValue(where: { id: $FieldValueId }, data: { value: $value }) {
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

export const ADD_UNLOCK_TO_ENTITY_INSTANCE_STATE_TRANSITION = gql`
  mutation addUnlockToEntityInstanceStateTransition(
    $entityInstanceStateTransitionId: ID!
    $entityInstanceStateId: ID!
  ) {
    updateEntityInstanceStateTransition(
      where: { id: $entityInstanceStateTransitionId }
      data: { unlocks: { connect: [{ id: $entityInstanceStateId }] } }
    ) {
      id
      from {
        id
        instance {
          id
        }
      }
      unlocks {
        id
      }
    }
  }
`

export const REMOVE_UNLOCK_FROM_ENTITY_INSTANCE_STATE_TRANSITION = gql`
  mutation removeUnlockFromEntityInstanceStateTransition(
    $entityInstanceStateTransitionId: ID!
    $entityInstanceStateId: ID!
  ) {
    updateEntityInstanceStateTransition(
      where: { id: $entityInstanceStateTransitionId }
      data: { unlocks: { disconnect: [{ id: $entityInstanceStateId }] } }
    ) {
      id
      from {
        id
        instance {
          id
        }
      }
      unlocks {
        id
      }
    }
  }
`

export const CREATE_ENTITY_INSTANCE_STATE_TRANSITION = gql`
  mutation createEntityInstanceStateTransition(
    $from: ID!
    $to: ID!
    $unlocks: ID!
  ) {
    createEntityInstanceStateTransition(
      data: {
        from: { connect: { id: $from } }
        to: { connect: { id: $to } }
        unlocks: { connect: [{ id: $unlocks }] }
      }
    ) {
      id
      from {
        id
        instance {
          id
        }
      }
      to {
        id
      }
      unlocks {
        id
      }
    }
  }
`

export const CREATE_ENTITY_INSTANCE_STATE_TRANSITIONS = gql`
  mutation createEntityInstanceStateTransitions(
    $gameId: ID!
    $entityInstanceUpdates: [EntityInstanceUpdateWithWhereUniqueWithoutGameInput!]!
  ) {
    updateGame(
      where: { id: $gameId }
      data: { instances: { update: $entityInstanceUpdates } }
    ) {
      id
      instances {
        ...EntityInstanceFragment
      }
    }
  }
  ${ENTITY_INSTANCE_FRAGMENT}
`

export const CREATE_ENTITY_INSTANCES = gql`
  mutation createEntityInstances(
    $gameId: ID!
    $entityInstancesToCreate: [EntityInstanceCreateWithoutGameInput!]!
    $entityInstancesToUpdate: [EntityInstanceUpdateWithWhereUniqueWithoutGameInput!]!
  ) {
    updateGame(
      where: { id: $gameId }
      data: {
        instances: {
          create: $entityInstancesToCreate
          update: $entityInstancesToUpdate
        }
      }
    ) {
      id
      instances {
        ...EntityInstanceFragment
      }
    }
  }
  ${ENTITY_INSTANCE_FRAGMENT}
`

export const DELETE_NODES = gql`
  mutation deleteNodes(
    $entityInstanceIds: [ID!]!
    $entityInstanceStateIds: [ID!]!
  ) {
    deleteManyEntityInstanceStateTransitions(
      where: {
        OR: [
          { from: { id_in: $entityInstanceStateIds } }
          { to: { id_in: $entityInstanceStateIds } }
        ]
      }
    ) {
      count
    }
    deleteManyEntityInstanceStates(where: { id_in: $entityInstanceStateIds }) {
      count
    }

    deleteManyInformations(
      where: { entityInstance: { id_in: $entityInstanceIds } }
    ) {
      count
    }

    deleteManyFieldValues(
      where: { entityInstance: { id_in: $entityInstanceIds } }
    ) {
      count
    }

    deleteManyEntityInstances(where: { id_in: $entityInstanceIds }) {
      count
    }
  }
`

export const CONNECT_INFORMATION_WITH_FIELD_VALUE = gql`
  mutation connectInformationWithFieldValue(
    $informationId: ID!
    $fieldValueId: ID!
  ) {
    updateInformation(
      where: { id: $informationId }
      data: { fieldValue: { connect: { id: $fieldValueId } } }
    ) {
      ...InformationFragment
    }
  }
  ${INFORMATION_FRAGMENT}
`

export const DISCONNECT_INFORMATION_FROM_FIELD_VALUE = gql`
  mutation disconnectInformationFromFieldValue($informationId: ID!) {
    updateInformation(
      where: { id: $informationId }
      data: { fieldValue: { disconnect: true } }
    ) {
      ...InformationFragment
    }
  }
  ${INFORMATION_FRAGMENT}
`
