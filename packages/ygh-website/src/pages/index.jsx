import React from 'react'
import styled, { css } from 'styled-components'
import { graphql } from 'gatsby'

import { Wrapper, Row, Column, Align } from 'components/ui'
import PreviewCompatibleImage from 'components/PreviewCompatibleImage'

import Layout from 'components/landing/Layout'
import IndexHeader from 'components/landing/IndexHeader'
import CTA from 'components/landing/CTA'
import Trail from 'components/landing/Trail'
import Cross from 'components/landing/Cross'
import Tip from 'components/landing/Tip'
import PuzzleTemplate from 'components/landing/PuzzleTemplate'

import location from 'images/icons/location.svg'
import friend from 'images/icons/friend.svg'
import time from 'images/icons/time.svg'
import question from 'images/icons/question.svg'
import hide from 'images/icons/seek.svg'
import picture from 'images/icons/picture.svg'

import map from 'images/map.svg'

const Section = styled.section`
  &::after {
    content: '';
    display: block;
    clear: both;
  }

  padding: 2em 0;

  ${props => props.darker && css`
    background-color: #0001;
  `}
`

const WrapperWithMap = styled(Wrapper)`
  margin-bottom: -2em;
  padding-bottom: 2em;
  padding-right: 14em;

  background: url(${map}) no-repeat right bottom / contain;
`

const StyledPreviewCompatibleImage = styled(PreviewCompatibleImage)`
  width: 100%;
  border-radius: 260% 120% 190% 250% / 250% 210% 180% 190%;

  @media (min-width: 45em) {
    width: 250%;
  }
`

const IphoneImage = styled(PreviewCompatibleImage)`
  @media (max-width: 30em) {
    transform: rotate(90deg);
    height: calc(100vw - 4em);
    width: calc(50vw - 2em);
    margin: -15vw calc(25vw - 1em);
  }
`

export default ({ data }) => {
  const headerImageInfo = {
    alt: 'Background',
    image: {
      childImageSharp: data.background.childImageSharp,
    }
  }
  const exciteImageInfo = {
    alt: 'Excite',
    image: {
      childImageSharp: data.excite.childImageSharp,
    }
  }
  const playImageInfo = {
    alt: 'Play',
    image: {
      childImageSharp: data.play.childImageSharp,
    }
  }

  return (
    <Layout index>
      <IndexHeader imageInfo={headerImageInfo} />
      <Trail rtl />
      <Section id="excite">
        <Wrapper xlarge>
          <Row>
            <Column rtl size={4} sSize={12}>
              <StyledPreviewCompatibleImage imageInfo={exciteImageInfo} />
            </Column>
            <Column size={8} sSize={12}>
              <h2>Excite</h2>
              <p>Build anticipation for the gift to come by playing a scavenger hunt full of puzzles and interpersonal memories.</p>
              <Row>
                <Column size={6} sSize={12}>
                  <h3>For your partner</h3>
                  <p>A unique way to give your partner a romantic and adventurous reminder of your relationship.</p>
                </Column>
                <Column size={6} sSize={12}>
                  <h3>For a close friend</h3>
                  <p>Send a close on an adventure that celebrates the times the two of you have had. A great way to show them your appreciation.</p>
                </Column>
              </Row>
            </Column>
          </Row>
        </Wrapper>
      </Section>
      <Trail ltr />
      <Section id="create">
        <Wrapper xlarge>
          <Row rtl>
            <Column size={8} sSize={12}>
              <article>
                <h2>1. Create</h2>
                <p>We created a versatile collection of puzzle templates, so that you can be fully creative and make your unique and personal gift hunt.</p>
              </article>
              <Row>
                <Column size={4} sSize={6}>
                  <PuzzleTemplate
                    icon={location}
                    title="Location based puzzles"
                    exerpt="Revisit memorable and personally meaningful places."
                  />
                </Column>
                <Column size={4} sSize={6}>
                  <PuzzleTemplate
                    icon={friend}
                    title="Friend based puzzles"
                    exerpt="Make the hunt even more fun by involving your or their friends."
                  />
                </Column>
                <Column size={4} sSize={6}>
                  <PuzzleTemplate
                    icon={time}
                    title="Time based puzzles"
                  />
                </Column>
                <Column size={4} sSize={6}>
                  <PuzzleTemplate
                    icon={question}
                    title="Personal questions"
                  />
                </Column>
                <Column size={4} sSize={6}>
                  <PuzzleTemplate
                    icon={hide}
                    title="Hide and seek"
                  />
                </Column>
                <Column size={4} sSize={6}>
                  <PuzzleTemplate
                    icon={picture}
                    title="Picture puzzles"
                  />
                </Column>
              </Row>
            </Column>
          </Row>
        </Wrapper>
      </Section>
      <Trail rtl />
      <Section id="play">
        <Wrapper xlarge>
          <Row>
            <Column rtl size={4} sSize={12}>
              <IphoneImage imageInfo={playImageInfo} />
            </Column>
            <Column size={8} sSize={12}>
              <h2>2. Play</h2>
              <p>The hunt is completely play</p>
              <Row>
                <Column size={6} sSize={12}>
                  <h3>Track progress</h3>
                  <p>You can track their progress using the progress dashboard.</p>
                </Column>
                <Column size={6} sSize={12}>
                  <h3>Help with hints</h3>
                  <p>When they are stuck on some puzzle, you can ofcourse help them with hints.</p>
                </Column>
              </Row>
              <Tip>A hunt can span multiple days, a few weeks even. Use this to play and to build anticipation for the gift to come.</Tip>
            </Column>
          </Row>
        </Wrapper>
      </Section>
      <Trail ltr />
      <Section id="give">
        <Wrapper xlarge>
          <Row rtl>
            <Column size={4} sSize={12}>
              <Cross />
            </Column>
            <Column size={8} sSize={12}>
              <Wrapper xlarge>
                <h2>3. Give</h2>
                <p>After the hard work of the hunt, it is time to give them what they have been working for. We promise that they will appreciate it more, for they have really earned it.</p>
              </Wrapper>
            </Column>
          </Row>
        </Wrapper>
      </Section>
      <Section darker id="extra">
        <WrapperWithMap xlarge>
          <article>
            <h2>Loved your hunt?</h2>
            <p>For only <em>€5,-</em><sup>*</sup> you can look back on your adventure with the adventure poster. It details all the steps taken, places visited and friends met during the hunt, a great reminder!</p>
          </article>
          <sup>*</sup><small>Excluding shipping costs</small>
        </WrapperWithMap>
      </Section>
      <Section id="cta">
        <Align.Center>
          <h2>Be the first to make your own hunt?</h2>
          <p>Subscribe to our newsletter for early access and our latest stories.</p>
          <CTA />
        </Align.Center>
      </Section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    background: file(relativePath: { eq: "background.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 960, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    excite: file(relativePath: { eq: "excite.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 960, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    play: file(relativePath: { eq: "play.png" }) {
      childImageSharp {
        fluid(maxWidth: 960, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
