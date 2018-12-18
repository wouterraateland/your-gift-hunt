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

import {
  Location,
  Friend,
  Time,
  Question,
  Seek,
  Picture
} from 'components/icons'

import map from 'images/map.svg'

const Section = styled.section`
  &::after {
    content: '';
    display: block;
    clear: both;
  }

  position: relative;
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

const IphoneImage = styled(PreviewCompatibleImage)`
  @media (max-width: 45em) {
    transform: rotate(90deg);
    height: calc(100vw - 4em);
    width: calc(50vw - 2em);
    margin: -15vw calc(25vw - 1em);
  }
`

const BeachSection = styled(Section)`
  margin-top: 2em;

  &::before {
    content: '';
    position: absolute;
    left: -10%; top: 0em;
    right: -10%; bottom: -1em;
    z-index: -3;

    border-radius: 80% 10% 70% 10% / 20% 10% 100% 10%;
    box-shadow: 0 -13em 13em -4em #2196f3cc, 0 -4em 4em #3d4fbacc;

    background: linear-gradient(160deg, #ffd65a 30%, transparent 85%);

    transform: skewY(10deg);
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
      <Trail xlarge rtl />
      <Section id="excite">
        <Wrapper xlarge>
          <Row>
            <Column rtl size={4} mSize={12}>
            </Column>
            <Column size={8} mSize={12}>
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
      <Trail xlarge ltr />
      <Section id="create">
        <Wrapper xlarge>
          <article>
            <h2>1. Create</h2>
            <p>We created a versatile collection of puzzle templates, so that you can be fully creative and make your unique and personal gift hunt.</p>
          </article>
          <Row vAlign="top">
            <Column size={4} mSize={6}>
              <PuzzleTemplate
                icon={Location}
                title="Location based challenges"
                exerpt="Revisit memorable and personally meaningful places."
              />
            </Column>
            <Column size={4} mSize={6}>
              <PuzzleTemplate
                icon={Friend}
                title="Friend based challenges"
                exerpt="Make the hunt even more fun by involving your or the player's friends."
              />
            </Column>
            <Column size={4} mSize={6}>
              <PuzzleTemplate
                icon={Time}
                title="Time based challenges"
                exerpt="A challenge on your night out? Just after waking up? you name it."
              />
            </Column>
            <Column size={4} mSize={6}>
              <PuzzleTemplate
                icon={Question}
                title="Personal questions"
                exerpt="Make sure the player remembers your facts."
              />
            </Column>
            <Column size={4} mSize={6}>
              <PuzzleTemplate
                icon={Seek}
                title="Hide and seek"
                exerpt="Have the player collect codes and other hints."
              />
            </Column>
            <Column size={4} mSize={6}>
              <PuzzleTemplate
                icon={Picture}
                title="Picture challenges"
                exerpt="How about a selfie to unlock next challenge..."
              />
            </Column>
          </Row>
        </Wrapper>
      </Section>
      <Trail xlarge rtl />
      <BeachSection id="play">
        <Wrapper xlarge>
          <Row>
            <Column rtl size={4} mSize={12}>
              <IphoneImage imageInfo={playImageInfo} />
            </Column>
            <Column size={8} mSize={12}>
              <h2>2. Play</h2>
              <p>The hunt is completely play</p>
              <Row>
                <Column size={6} sSize={12}>
                  <h3>Track progress</h3>
                  <p>You can track the player's progress using the progress dashboard.</p>
                </Column>
                <Column size={6} sSize={12}>
                  <h3>Help with hints</h3>
                  <p>When the player is stuck on some puzzle, you can of course help them with hints.</p>
                </Column>
              </Row>
              <Tip>A hunt can span multiple days, a few weeks even. Use this to play and to build anticipation for the gift to come.</Tip>
            </Column>
          </Row>
        </Wrapper>
      </BeachSection>
      <Trail xlarge ltr />
      <Section id="give">
        <Wrapper xlarge>
          <Row rtl>
            <Column size={4} sSize={12}>
              <Cross />
            </Column>
            <Column size={8} sSize={12}>
              <article>
                <h2>3. Give</h2>
                <p>After the hard work of the hunt, it is time to give the player what he has been working so hard for. We promise that they will appreciate it more, for they have really earned it.</p>
              </article>
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
