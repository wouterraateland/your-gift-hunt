import gql from "graphql-tag"

export const GAME_BY_SLUG = gql`
  query gameBySlug($creatorSlug: String!, $gameSlug: String!) {
    games(where: { creator: { slug: $creatorSlug }, slug: $gameSlug }) {
      id
      name
      slug
      description
      privacy
      accessType
      accessCode
      creator {
        name
        slug
      }
      instances {
        id
        name
        states {
          id
          unlockedBy {
            from {
              instance {
                id
              }
            }
          }
          outgoingTransitions {
            to {
              id
            }
            unlocks {
              id
            }
          }
          state {
            id
            name
            outgoingTransitions {
              to {
                id
              }
              requiredActions {
                type
                payload {
                  requiredEntity {
                    entity {
                      id
                    }
                    state {
                      id
                    }
                  }
                }
              }
            }
          }
        }
        fields {
          id
          value
          field {
            id
            label
            info
            type
            isMulti
            isSecret
          }
        }
        entity {
          id
          name
          description
          isItem
          isObject
          isTrigger
          defaultState {
            id
          }
          featuredField {
            id
          }
        }
      }
    }
  }
`

export const CREATED_GAMES = gql`
  query createdGames($creatorId: ID!, $slugPrefix: String) {
    games(
      where: { creator: { id: $creatorId }, slug_starts_with: $slugPrefix }
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
