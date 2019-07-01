import gql from "graphql-tag"
import {
  ENTITY_TEMPLATE_FRAGMENT,
  ENTITY_FRAGMENT,
  STATE_TRANSITION_FRAGMENT
} from "./fragments"

export const TEMPLATE_OPTIONS = gql`
  query templateOptions {
    fieldTypes {
      id
      type
      isMulti
    }
  }
`

export const ENTITY_TEMPLATES = gql`
  query entityTemplatesForGame($gameId: ID!) {
    entityTemplates(
      where: { OR: [{ set: { games_some: { id: $gameId } } }, { set: null }] }
    ) {
      ...EntityTemplateFragment
    }
  }
  ${ENTITY_TEMPLATE_FRAGMENT}
`

export const TEST_SERVICE = gql`
  query {
    service(where: { name: "play.yourgifthunt.com" }) {
      id
    }
  }
`

export const TEMPLATE_SET_BY_ID = gql`
  query entityTemplateSetById($templateSetId: ID!) {
    entityTemplateSet(where: { id: $templateSetId }) {
      id
      name
      description

      games {
        id
      }

      creator {
        id
        name
        slug
      }

      entityTemplates {
        ...EntityTemplateFragment
      }
    }
  }
  ${ENTITY_TEMPLATE_FRAGMENT}
`

export const GAME_BY_SLUG = gql`
  query gameBySlug($creatorSlug: String!, $gameSlug: String!) {
    games(where: { creator: { slug: $creatorSlug }, slug: $gameSlug }) {
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

      creator {
        id
        name
        slug
      }
      entities {
        ...EntityFragment
      }
      entityTemplateSets {
        id
        name
        description
      }
      startContainer {
        id
      }
    }
  }
  ${ENTITY_FRAGMENT}
`

export const USER_GAMES = gql`
  query createdGames($userId: ID!, $slugPrefix: String) {
    user(where: { id: $userId }) {
      id
      games(where: { slug_starts_with: $slugPrefix }, orderBy: updatedAt_DESC) {
        id
        createdAt
        updatedAt
        publishedAt

        name
        slug
        image

        privacy

        plays {
          id
          isTest
        }
        creator {
          id
          name
          slug
        }
      }
    }
  }
`

export const USER_TEMPLATE_SETS = gql`
  query createdEntityTemplateSets($userId: ID!) {
    user(where: { id: $userId }) {
      id
      entityTemplateSetsCreated(orderBy: updatedAt_DESC) {
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
  }
`

export const USER = gql`
  query user($userId: ID!) {
    user(where: { id: $userId }) {
      id
      name
      slug
    }
  }
`

export const USER_COUNT_BY_SLUG = gql`
  query userCountBySlug($slug: String!) {
    usersConnection(where: { slug: $slug }) {
      aggregate {
        count
      }
    }
  }
`

export const GAME_COUNT_BY_SLUG = gql`
  query gameCountBySlug($creatorSlug: String!, $gameSlug: String!) {
    gamesConnection(
      where: { slug: $gameSlug, creator: { slug: $creatorSlug } }
    ) {
      aggregate {
        count
      }
    }
  }
`

export const STATE_TRANSITIONS = gql`
  query stateTransitions($from: ID!) {
    stateTransitions(where: { from: { id: $from } }) {
      ...StateTransitionFragment
    }
  }
  ${STATE_TRANSITION_FRAGMENT}
`
