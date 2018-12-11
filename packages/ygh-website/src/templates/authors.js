import React from 'react'
import { graphql } from 'gatsby'

import PostPage from 'components/PostPage'

const AuthorRoute = ({ data, pageContext }) =>
  <PostPage data={data} filter={pageContext.author} />

export default AuthorRoute

export const authorPageQuery = graphql`
  query AuthorPage($author: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { author: { eq: $author } } }
    ) {
      totalCount
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            author
            category
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
