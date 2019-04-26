import React from "react"
import { graphql } from "gatsby"

import PostPage from "components/PostPage"

const BlogPage = ({ data }) => <PostPage data={data} filter={null} />

export default BlogPage

export const pageQuery = graphql`
  query BlogQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
    ) {
      edges {
        node {
          excerpt
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            tags
            category
            author
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
