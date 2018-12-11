import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import Layout from 'components/Layout'
import { Wrapper } from 'components/ui'
import Content, { HTMLContent } from 'components/Content'

export const InfoPageTemplate = ({ content, contentComponent }) => {
  const PageContent = contentComponent || Content

  return (
    <Wrapper medium>
      <PageContent className="content" content={content} />
    </Wrapper>
  )
}

const InfoPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <Helmet titleTemplate="%s | Your Gift Hunt">
        <title>{post.frontmatter.title}</title>
        {!!post.frontmatter.description && (
          <meta
            name="description"
            content={post.frontmatter.description}
          />
        )}
      </Helmet>
      <InfoPageTemplate
        contentComponent={HTMLContent}
        content={post.html}
      />
    </Layout>
  )
}

export default InfoPage

export const aboutPageQuery = graphql`
  query InfoPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`
