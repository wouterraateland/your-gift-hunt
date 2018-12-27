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
import Present from 'components/landing/Present'

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
  max-width: 10em;
  margin: 0 auto 2em;
`

const BeachSection = styled(Section)`
  margin-top: 2em;

  &::before {
    content: '';
    position: absolute;
    left: 0; top: 0vw;
    right: 0; bottom: 20vw;
    z-index: -3;

    background: ${props => props.theme.color.accent};

    transform: skewY(30deg);
  }
`

const RelativeColumn = styled(Column)`
  position: relative;
  margin: 4em 0 2em;
`

const PresentOne = styled(Present)`
  position: absolute;
  top: -8em;
  right: 1em;

  width: 7em;
`

const PresentTwo = styled(PresentOne)`
  top: 4em;
  right: -3em;
  width: 10em;
`

const PresentThree = styled(PresentOne)`
  top: 10em;
  right: 6em;
  width: 5em;
`

export default ({ data }) => {
  const headerImageInfo = {
    alt: 'Background',
    image: {
      childImageSharp: data.background.childImageSharp,
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
        <Wrapper>
          <Row>
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
      <Trail ltr />
      <Section id="create">
        <Wrapper>
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
      <Trail rtl />
      <BeachSection id="play">
        <Wrapper>
          <Row>
            <Column rtl size={4} sSize={6}>
              <IphoneImage imageInfo={playImageInfo} />
            </Column>
            <Column size={8} sSize={12}>
              <h2>2. Play</h2>
              <p>The hunt is playable completely from the app. You can track the players progress and help them with hints.</p>
              <Row>
                <Column size={6} mSize={12}>
                  <h3>Track progress</h3>
                  <p>You can track the player's progress using the progress dashboard.</p>
                </Column>
                <Column size={6} mSize={12}>
                  <h3>Help with hints</h3>
                  <p>When the player is stuck on some puzzle, you can of course help them with hints.</p>
                </Column>
              </Row>
              <Tip>A hunt can span multiple days, a few weeks even. Use this to play and to build anticipation for the gift to come.</Tip>
            </Column>
          </Row>
        </Wrapper>
      </BeachSection>
      <Trail ltr />
      <Section id="give">
        <Wrapper>
          <Row rtl>
            <RelativeColumn size={4} sSize={12}>
              <Cross />
              <PresentOne />
              <PresentTwo boxColor="#22a1e8" ribbonColor="#fa6d07" />
              <PresentThree boxColor="#ffad33" />
            </RelativeColumn>
            <Column size={8} sSize={12}>
              <article>
                <h2>3. Give</h2>
                <p>After the hard work of the hunt, it is time to give the player what he has been working so hard for. We promise that they will appreciate it more, for they have really earned it.</p>
              </article>
            </Column>
          </Row>
        </Wrapper>
      </Section>
      {/* <Section darker id="extra">
        <WrapperWithMap xlarge>
          <article>
            <h2>Loved your hunt?</h2>
            <p>For only <em>€5,-</em><sup>*</sup> you can look back on your adventure with the adventure poster. It details all the steps taken, places visited and friends met during the hunt, a great reminder!</p>
          </article>
          <sup>*</sup><small>Excluding shipping costs</small>
        </WrapperWithMap>
      </Section> */}
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
    play: file(relativePath: { eq: "play.png" }) {
      childImageSharp {
        fluid(maxWidth: 960, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
