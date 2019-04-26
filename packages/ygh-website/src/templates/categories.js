import React from "react"
import { graphql } from "gatsby"
import PostPage from "components/PostPage"

const CategoryRoute = ({ data, pageContext }) => (
  <PostPage data={data} filter={pageContext.category} />
)

export default CategoryRoute

export const categoryPageQuery = graphql`
  query CategoryPage($category: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { eq: $category } } }
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
