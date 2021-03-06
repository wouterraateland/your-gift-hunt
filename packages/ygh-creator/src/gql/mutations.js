import gql from "graphql-tag"
import {
  INFORMATION_SLOT_FRAGMENT,
  STATE_TRANSITION_FRAGMENT,
  PORTAL_FRAGMENT,
  ENTRANCE_FRAGMENT,
  ENTITY_FRAGMENT,
  ENTITY_TEMPLATE_FRAGMENT,
  ACTION_REQUIREMENT_FRAGMENT
} from "./fragments"

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
    $creator: UserCreateOneWithoutGamesCreatedInput
    $cooperators: UserCreateManyWithoutGamesInput
    $privacy: PrivacyType!
    $accessType: AccessType!
    $accessCode: String
  ) {
    createGame(
      data: {
        name: $name
        slug: $slug
        description: $description
        creator: $creator
        cooperators: $cooperators
        privacy: $privacy
        accessType: $accessType
        accessCode: $accessCode
        entityTemplateSets: { connect: { id: "cjvz7l2lb03240732dj26hv9e" } }
      }
    ) {
      id
      name
      slug
      createdAt
      updatedAt
      publishedAt
      creator {
        id
        name
        slug
      }
    }
  }
`

export const UPDATE_GAME_CREATOR = gql`
  mutation updateGameCreator($gameId: ID!, $userId: ID!) {
    updateGame(
      where: { id: $gameId }
      data: {
        creator: { connect: { id: $userId } }
        cooperators: { connect: [{ id: $userId }] }
      }
    ) {
      id
    }
  }
`

export const PUBLISH_GAME = gql`
  mutation publishGame($gameId: ID!, $now: DateTime!) {
    updateGame(where: { id: $gameId }, data: { publishedAt: $now }) {
      id
      name
      slug
      createdAt
      updatedAt
      publishedAt
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
      slug
      description
      image

      intro
      outro

      publishedAt

      privacy
      accessType
      accessCode

      entityTemplateSets {
        id
        name
        description
      }
    }
  }
`

export const SET_START_CONTAINER = gql`
  mutation updateGame($gameId: ID!, $containerId: ID!) {
    updateGame(
      where: { id: $gameId }
      data: { startContainer: { connect: { id: $containerId } } }
    ) {
      id
      startContainer {
        id
      }
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

export const CREATE_GAME_PLAY = gql`
  mutation createGamePlay(
    $gameId: ID!
    $player: UserCreateOneWithoutPlaysInput
    $serviceId: ID!
  ) {
    createGamePlay(
      data: {
        game: { connect: { id: $gameId } }
        player: $player
        service: { connect: { id: $serviceId } }
        isTest: true
      }
    ) {
      id
    }
  }
`

export const UPDATE_ENTITY_NAME = gql`
  mutation updateEntityName($entityId: ID!, $name: String!) {
    updateEntity(where: { id: $entityId }, data: { name: $name }) {
      id
      name
    }
  }
`

export const UPDATE_ENTITY_CONTAINER = gql`
  mutation updateEntityContainer($entityId: ID!, $containerId: ID!) {
    updateEntity(
      where: { id: $entityId }
      data: { container: { connect: { id: $containerId } } }
    ) {
      id
      container {
        id
      }
    }
  }
`

export const DISCONNECT_ENTITY_FROM_CONTAINER = gql`
  mutation disconnectEntityFromContainer($entityId: ID!) {
    updateEntity(
      where: { id: $entityId }
      data: { container: { disconnect: true } }
    ) {
      id
      container {
        id
      }
    }
  }
`

export const UPDATE_FIELD_VALUE = gql`
  mutation updateFieldValue($fieldId: ID!, $value: String!) {
    updateField(where: { id: $fieldId }, data: { value: $value }) {
      id
      value
    }
  }
`

export const CREATE_ACTION_REQUIREMENT = gql`
  mutation addRequiredActionToStateTransition(
    $transitionId: ID!
    $type: ActionType!
    $stateId: ID!
  ) {
    updateStateTransition(
      where: { id: $transitionId }
      data: {
        requiredActions: {
          create: {
            type: $type
            payload: {
              create: {
                requiredEntity: {
                  create: { entityState: { connect: { id: $stateId } } }
                }
              }
            }
          }
        }
      }
    ) {
      id
      template {
        id
      }

      from {
        id
      }
      to {
        id
      }
      unlocks {
        id
      }

      requiredActions {
        ...ActionRequirementFragment
      }
    }
  }
  ${ACTION_REQUIREMENT_FRAGMENT}
`

export const UPDATE_ACTION_REQUIREMENT = gql`
  mutation updateActionRequirement(
    $actionRequirementId: ID!
    $type: ActionType!
    $stateId: ID!
  ) {
    updateActionRequirement(
      where: { id: $actionRequirementId }
      data: {
        type: $type
        payload: {
          update: {
            requiredEntity: {
              update: { entityState: { connect: { id: $stateId } } }
            }
          }
        }
      }
    ) {
      ...ActionRequirementFragment
    }
  }
  ${ACTION_REQUIREMENT_FRAGMENT}
`

export const DELETE_ACTION_REQUIREMENT = gql`
  mutation deleteActionRequirement($actionRequirementId: ID!) {
    deleteActionRequirement(where: { id: $actionRequirementId }) {
      ...ActionRequirementFragment
    }
  }
  ${ACTION_REQUIREMENT_FRAGMENT}
`

export const CREATE_HINT = gql`
  mutation createHint($actionRequirementId: ID!, $text: String!, $delay: Int) {
    createHint(
      data: {
        text: $text
        delay: $delay
        actionRequirement: { connect: { id: $actionRequirementId } }
      }
    ) {
      id
      text
      delay
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

export const CONNECT_PORTAL_WITH_ENTRANCE = gql`
  mutation connectPortalWithEntrance($portalId: ID!, $entranceId: ID!) {
    updatePortal(
      where: { id: $portalId }
      data: { entrance: { connect: { id: $entranceId } } }
    ) {
      ...PortalFragment
    }
  }
  ${PORTAL_FRAGMENT}
`

export const DISCONNECT_PORTAL_FROM_ENTRANCE = gql`
  mutation disconnectPortalFromEntrance($entranceId: ID!) {
    updateEntrance(
      where: { id: $entranceId }
      data: { portal: { disconnect: true } }
    ) {
      ...EntranceFragment
    }
  }
  ${ENTRANCE_FRAGMENT}
`

export const DISCONNECT_ENTRANCE_FROM_PORTAL = gql`
  mutation disconnectEntranceFromPortal($portalId: ID!) {
    updatePortal(
      where: { id: $portalId }
      data: { entrance: { disconnect: true } }
    ) {
      ...PortalFragment
    }
  }
  ${PORTAL_FRAGMENT}
`

export const ADD_UNLOCK_TO_STATE_TRANSITION = gql`
  mutation addUnlockToStateTransition($stateTransitionId: ID!, $stateId: ID!) {
    updateStateTransition(
      where: { id: $stateTransitionId }
      data: { unlocks: { connect: [{ id: $stateId }] } }
    ) {
      ...StateTransitionFragment
    }
  }
  ${STATE_TRANSITION_FRAGMENT}
`

export const REMOVE_UNLOCK_FROM_STATE_TRANSITION = gql`
  mutation removeUnlockFromStateTransition(
    $stateTransitionId: ID!
    $stateId: ID!
  ) {
    updateStateTransition(
      where: { id: $stateTransitionId }
      data: { unlocks: { disconnect: [{ id: $stateId }] } }
    ) {
      ...StateTransitionFragment
    }
  }
  ${STATE_TRANSITION_FRAGMENT}
`

export const UPDATE_ENTITIES = gql`
  mutation updateEntities(
    $gameId: ID!
    $entityUpdates: [EntityUpdateWithWhereUniqueWithoutGameInput!]!
  ) {
    updateGame(
      where: { id: $gameId }
      data: { entities: { update: $entityUpdates } }
    ) {
      id
      entities {
        ...EntityFragment
      }
    }
  }
  ${ENTITY_FRAGMENT}
`

export const UPDATE_ENTITY = gql`
  mutation updateEntity($entityId: ID!, $entityUpdate: EntityUpdateInput!) {
    updateEntity(where: { id: $entityId }, data: $entityUpdate) {
      ...EntityFragment
    }
  }
  ${ENTITY_FRAGMENT}
`

export const CREATE_ENTITIES = gql`
  mutation createEntities(
    $gameId: ID!
    $entitiesToCreate: [EntityCreateWithoutGameInput!]!
    $entitiesToUpdate: [EntityUpdateWithWhereUniqueWithoutGameInput!]!
  ) {
    updateGame(
      where: { id: $gameId }
      data: {
        entities: { create: $entitiesToCreate, update: $entitiesToUpdate }
      }
    ) {
      id
      entities {
        ...EntityFragment
      }
    }
  }
  ${ENTITY_FRAGMENT}
`

export const DELETE_NODES = gql`
  mutation deleteNodes($entityIds: [ID!]!, $stateIds: [ID!]!) {
    deleteManyStates(where: { id_in: $stateIds }) {
      count
    }

    deleteManyEntities(where: { id_in: $entityIds }) {
      count
    }
  }
`

export const CONNECT_INFORMATION_SLOT_WITH_FIELD = gql`
  mutation connectInformationWithField($informationSlotId: ID!, $fieldId: ID!) {
    updateInformationSlot(
      where: { id: $informationSlotId }
      data: { field: { connect: { id: $fieldId } } }
    ) {
      ...InformationSlotFragment
    }
  }
  ${INFORMATION_SLOT_FRAGMENT}
`

export const DISCONNECT_INFORMATION_SLOT_FROM_FIELD = gql`
  mutation disconnectInformationFromFieldValue($informationSlotId: ID!) {
    updateInformationSlot(
      where: { id: $informationSlotId }
      data: { field: { disconnect: true } }
    ) {
      ...InformationSlotFragment
    }
  }
  ${INFORMATION_SLOT_FRAGMENT}
`

export const CREATE_TEMPLATE_SET = gql`
  mutation createEntityTemplateSet($values: EntityTemplateSetCreateInput!) {
    createEntityTemplateSet(data: $values) {
      id
      createdAt
      updatedAt

      name
      description

      games {
        id
      }
      entityTemplates {
        id
      }
      creator {
        id
        slug
      }
    }
  }
`

export const UPDATE_TEMPLATE_SET = gql`
  mutation updateEntityTemplateSet(
    $templateSetId: ID!
    $values: EntityTemplateSetUpdateInput!
  ) {
    updateEntityTemplateSet(where: { id: $templateSetId }, data: $values) {
      id
      createdAt
      updatedAt

      name
      description

      games {
        id
      }
      entityTemplates {
        id
      }
      creator {
        id
        slug
      }
    }
  }
`

export const DELETE_TEMPLATE_SET = gql`
  mutation deleteEntityTemplateSet($templateSetId: ID!) {
    deleteEntityTemplateSet(where: { id: $templateSetId }) {
      id
    }
  }
`

export const CREATE_ENTITY_TEMPLATE = gql`
  mutation createEntityTemplate($templateSetId: ID!) {
    createEntityTemplate(
      data: {
        states: { create: [{}] }
        set: { connect: { id: $templateSetId } }
      }
    ) {
      ...EntityTemplateFragment
    }
  }
  ${ENTITY_TEMPLATE_FRAGMENT}
`

export const UPDATE_ENTITY_TEMPLATE = gql`
  mutation updateEntityTemplate(
    $entityTemplateId: ID!
    $update: EntityTemplateUpdateInput!
  ) {
    updateEntityTemplate(where: { id: $entityTemplateId }, data: $update) {
      ...EntityTemplateFragment
    }
  }
  ${ENTITY_TEMPLATE_FRAGMENT}
`

export const DELETE_ENTITY_TEMPLATE = gql`
  mutation deleteEntityTemplate($entityTemplateId: ID!) {
    deleteEntityTemplate(where: { id: $entityTemplateId }) {
      id
    }
  }
`

export const UPDATE_STATE_TRANSITION_TEMPLATE = gql`
  mutation updateStateTransitionTemplate(
    $stateTransitionTemplateId: ID!
    $update: StateTransitionTemplateUpdateInput!
  ) {
    updateStateTransitionTemplate(
      where: { id: $stateTransitionTemplateId }
      data: $update
    ) {
      id
    }
  }
`
