import 'utils/RHLFix'

import React from "react"
import Helmet from "react-helmet"
import { graphql } from "gatsby"
import Layout from "layout"
import PostListing from "components/PostListing/PostListing"
import SEO from "components/SEO/SEO"
import config from "data/SiteConfig"

export default ({ data }) => {
  const postEdges = data.allMarkdownRemark.edges

  return (
    <Layout>
      <Helmet title={`Blog | ${config.siteTitle}`} />
      <PostListing postEdges={postEdges} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogQuery {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [fields___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            cover
            date
          }
        }
      }
    }
  }
`
