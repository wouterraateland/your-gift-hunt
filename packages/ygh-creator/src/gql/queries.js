import gql from "graphql-tag"

export const GAME_BY_SLUG = gql`
  query gameBySlug($creatorSlug: String!, $gameSlug: String!) {
    games(where: { creator: { slug: $creatorSlug }, slug: $gameSlug }) {
      id
      name
      instances {
        id
        name
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
