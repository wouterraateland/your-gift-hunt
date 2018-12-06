import React from 'react'
import { graphql } from 'gatsby'

import Layout from 'components/Layout'
import { Wrapper } from 'components/ui'
import Content, { HTMLContent } from 'components/Content'
import QuestionList from 'components/QuestionList'

export const FAQPageTemplate = ({ title, content, questions, contentComponent }) => {
  const PageContent = contentComponent || Content

  return (
    <Wrapper medium>
      <PageContent className="content" content={content} />
      <QuestionList questions={questions} />
    </Wrapper>
  )
}

const FAQPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <FAQPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
        questions={post.frontmatter.questions}
      />
    </Layout>
  )
}

export default FAQPage

export const aboutPageQuery = graphql`
  query FAQPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        questions {
          question
          answer
        }
      }
    }
  }
`
