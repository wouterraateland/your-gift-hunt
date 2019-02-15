import gql from "graphql-tag"

export const GAME_BY_SLUG = gql`
  query gameBySlug($creatorSlug: String!, $gameSlug: String!) {
    games(where: { creator: { slug: $creatorSlug }, slug: $gameSlug }) {
      id
      name
      instances {
        id
        name
        states {
          id
          unlockedBy {
            from {
              id
            }
            to {
              id
            }
          }
          state {
            id
            name
            incomingTransitions {
              from {
                id
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
          name
          description
          isItem
          isObject
          isTrigger
          featuredField {
            id
          }
        }
      }
    }
  }
`

export const CREATED_GAMES = gql`
  query userByNetlifyUserId($creatorId: ID!, $slugPrefix: String) {
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
