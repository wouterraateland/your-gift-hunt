import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'

import Layout from 'components/Layout'
import IndexHeader from 'components/IndexHeader'
import { Wrapper } from 'components/ui'

const Section = styled.section`
  min-height: 30vh;
  padding: 2em;
`

export default ({ data }) => {
  const imageInfo = {
    alt: 'Background',
    image: {
      childImageSharp: data.file.childImageSharp,
    }
  }

  return (
    <Layout index>
      <IndexHeader imageInfo={imageInfo} />
      <Section id="info">
        <Wrapper>
          <h2>More info soon...</h2>
        </Wrapper>
      </Section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    file(relativePath: { eq: "background.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 960, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
