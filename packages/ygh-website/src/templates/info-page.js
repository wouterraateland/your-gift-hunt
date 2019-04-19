import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import Helmet from "react-helmet"

import Layout from "components/Layout"
import { Section, Wrapper } from "your-gift-hunt/ui"
import Content, { HTMLContent } from "components/Content"
import Present from "components/Present"

const PresentsContainer = styled.div`
  position: relative;
  height: 14em;
  border-left: 30vw solid transparent;

  background: radial-gradient(
      ellipse 10em 5.2em at 50% 55%,
      ${props => props.theme.color.accent} 99%,
      transparent 100%
    )
    no-repeat;
`

const StyledPresent = styled(Present)`
  position: absolute;

  transform: translate(-50%, -50%);
`

const presents = [
  {
    style: { left: "50%", top: "4em", width: "8em" },
    boxColor: "#f12",
    ribbonColor: "#fff"
  },
  {
    style: { left: "calc(50% - 5em)", top: "6em", width: "4em" },
    boxColor: "#ffcb11",
    ribbonColor: "#3d9d29"
  },
  {
    style: { left: "calc(50% + 4em)", top: "7em", width: "6em" },
    boxColor: "#fff",
    ribbonColor: "#1484ec"
  },
  {
    style: { left: "calc(50% - 1em)", top: "9em", width: "4em" },
    boxColor: "#555",
    ribbonColor: "#ffae11"
  }
]

const Presents = () => (
  <PresentsContainer>
    {presents.map((present, i) => (
      <StyledPresent key={i} {...present} />
    ))}
  </PresentsContainer>
)

export const InfoPageTemplate = ({ content, contentComponent }) => {
  const PageContent = contentComponent || Content

  return (
    <Section>
      <Wrapper medium>
        <PageContent className="content" content={content} />
      </Wrapper>
    </Section>
  )
}

const InfoPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <Helmet titleTemplate="%s | Your Gift Hunt">
        <title>{post.frontmatter.title}</title>
        {!!post.frontmatter.description && (
          <meta name="description" content={post.frontmatter.description} />
        )}
      </Helmet>
      {post.frontmatter.title === "About us" && <Presents />}
      <InfoPageTemplate contentComponent={HTMLContent} content={post.html} />
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
