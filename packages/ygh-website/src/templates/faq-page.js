import React from "react"
import { graphql } from "gatsby"

import Helmet from "react-helmet"

import Content, { HTMLContent } from "components/Content"
import { Wrapper } from "ygh-ui"
import Layout from "components/Layout"
import QuestionList from "components/QuestionList"

export const FAQPageTemplate = ({ content, questions, contentComponent }) => {
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
      <Helmet titleTemplate="%s | Your Gift Hunt">
        <title>{post.frontmatter.title}</title>
        <meta
          name="description"
          content={
            post.frontmatter.description
              ? post.frontmatter.description
              : post.excerpt
          }
        />
      </Helmet>
      <FAQPageTemplate
        contentComponent={HTMLContent}
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
