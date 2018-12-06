import React from 'react'
import { graphql } from 'gatsby'

import Layout from 'components/Layout'
import { Wrapper } from 'components/ui'
import Content, { HTMLContent } from 'components/Content'

export const InfoPageTemplate = ({ title, content, contentComponent }) => {
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
      <InfoPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
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
