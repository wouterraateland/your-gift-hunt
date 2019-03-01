import gql from "graphql-tag"

export const ENTITIES = gql`
  query {
    entities {
      id
      name
      description
      isItem
      isObject
      isTrigger
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
            hints

            type
            payload {
              id
              requiredEntity {
                id
                entity {
                  id
                }
                state {
                  id
                }
              }
              requiredValues {
                id
                key
                eqValue
                neqValue
                eqField {
                  id
                }
                neqField {
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
        label
        info
        type
        isMulti
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
      slug
      description
      privacy
      accessType
      accessCode
      creator {
        id
        name
        slug
      }
      instances {
        id
        name
        states {
          id
          unlockedBy {
            id
            from {
              id
              instance {
                id
              }
            }
          }
          outgoingTransitions {
            id
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
            description
            outgoingTransitions {
              id
              to {
                id
              }
              requiredActions {
                id
                name
                type
                payload {
                  id
                  requiredEntity {
                    id
                    entity {
                      id
                    }
                    state {
                      id
                    }
                  }
                  requiredValues {
                    id
                    key
                    eqValue
                    neqValue
                    eqField {
                      id
                    }
                    neqField {
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

export const USER_GAMES = gql`
  query createdGames($userId: ID!, $slugPrefix: String) {
    user(where: { id: $userId }) {
      id
      games(where: { slug_starts_with: $slugPrefix }) {
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
