import gql from "graphql-tag"
import { ENTITY_FRAGMENT, STATE_TRANSITION_FRAGMENT } from "./fragments"

export const ENTITY_TEMPLATES = gql`
  query {
    entityTemplates {
      id
      name
      description
      isItem
      isObject
      isTrigger
      informationSlots {
        id
        name
        description
        allowedTypes {
          id
          type
          isMulti
        }
        entityStates {
          id
        }
      }
      defaultState {
        id
      }
      states {
        id
        name
        description
        incomingTransitions {
          id
          from {
            id
          }
        }
        outgoingTransitions {
          id
          to {
            id
          }
          requiredActions {
            id
            name
            hints {
              id
              text
              delay
            }

            type
            payload {
              id
              requiredEntity {
                id
                entityState {
                  id
                }
              }
              requiredInputs {
                id
                key
                not
                comparator
                value
                field {
                  id
                }
              }
            }
          }
        }
      }
      featuredField {
        id
      }
      fields {
        id
        name
        description

        type {
          id
          type
          isMulti
        }
        isSecret
      }
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

        name
        slug

        privacy

        plays {
          id
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
