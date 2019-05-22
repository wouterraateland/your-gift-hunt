import gql from "graphql-tag"
import {
  ENTITY_TEMPLATE_FRAGMENT,
  ENTITY_FRAGMENT,
  STATE_TRANSITION_FRAGMENT
} from "./fragments"

export const ENTITY_TEMPLATES = gql`
  query {
    entityTemplates {
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

export const GAME_BY_SLUG = gql`
  query gameBySlug($creatorSlug: String!, $gameSlug: String!) {
    games(where: { creator: { slug: $creatorSlug }, slug: $gameSlug }) {
      id
      name
      description
      slug
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
