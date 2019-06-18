import React from "react"
import styled from "styled-components"
import { graphql, navigate } from "gatsby"

import {
  Section,
  Wrapper,
  Row,
  Column,
  Align,
  Button,
  VSpace
} from "your-gift-hunt/ui"
import { Picture, Location, Friend } from "your-gift-hunt/icons"

import Layout from "components/Layout"
import CTA from "components/CTA"
import Hexagon from "components/Hexagon"
import Demo from "components/Demo"

import createImage from "images/create.svg"
import shareImage from "images/share.svg"
import playImage from "images/play.svg"

const Tagline = styled.p`
  font-size: 1.5em;
`

const Header = styled.header`
  position: relative;

  display: flex;
  align-items: center;
  min-height: calc(100vh - 6em);
  padding: 4em 0;

  @media (max-width: 45em) {
    min-height: auto;
  }
`
const LearnMore = styled.p`
  position: absolute;
  left: 50%;
  bottom: 0;

  transform: translate(-50%, 0);

  &::after {
    content: "";

    position: absolute;
    left: 50%;
    top: 2em;

    width: 1em;
    height: 1em;
    border-right: 0.2em solid;
    border-bottom: 0.2em solid;
    border-radius: 0.1em;

    transform: rotate(45deg) translate(-50%);
  }

  @media (max-width: 45em) {
    display: none;
  }
`

const StyledHexagon = styled(Hexagon)`
  margin: -4em auto;
  color: #fff;

  @media (max-width: 30em) {
    margin: 0 auto 3em;
  }
`

export default ({ data }) => {
  const demoImageInfo = {
    alt: "Demo",
    image: {
      childImageSharp: data.demo.childImageSharp
    }
  }

  return (
    <Layout index>
      <Header>
        <Wrapper>
          <Row>
            <Column size={6} mSize={12}>
              <h1>Create your own unique, personalized escape games</h1>
              <Tagline>
                Go beyond traditional puzzle games and amaze your friends
              </Tagline>
            </Column>
            <Column size={6} mSize={12}>
              <Demo
                imageInfo={demoImageInfo}
                url="https://play.yourgifthunt.com/play/wouter-raateland/escape-the-shed"
              />
            </Column>
          </Row>
        </Wrapper>
        <LearnMore>Learn More</LearnMore>
      </Header>
      <Section id="process">
        <Wrapper>
          <Align.Center>
            <h2>Get started in 3 easy steps</h2>
            <Row>
              <Column size={4} mSize={6} sSize={12}>
                <h3>1. Create</h3>
                <img src={createImage} alt="create" />
                <p>
                  Design your room layout, combine and modify puzzles from our
                  collection of templates, and add your personal style.
                </p>
              </Column>
              <Column size={4} mSize={6} sSize={12}>
                <h3>2. Share</h3>
                <img src={shareImage} alt="share" />
                <p>
                  Share your creation with the world via the showcase or make it
                  especially for someone and share it privately with them.
                </p>
              </Column>
              <Column size={4} mSize={6} sSize={12}>
                <h3>3. Play</h3>
                <img src={playImage} alt="play" />
                <p>
                  Play the game instantly on a mobile phone via an unique URL,
                  no download required.
                </p>
              </Column>
            </Row>
          </Align.Center>
        </Wrapper>
      </Section>
      <Section id="features">
        <Wrapper>
          <Align.Center>
            <h2>Go beyond traditional puzzle games</h2>
          </Align.Center>
          <VSpace.Small />
          <Row>
            <Column size={2} sSize={12}>
              <StyledHexagon>
                <Picture size={4} />
              </StyledHexagon>
            </Column>
            <Column size={6} mSize={10} sSize={12}>
              <h3>Mobile play bleeding into the real world</h3>
              <p>
                Hide codes for the player. They can scan them with code scanner
                built straight into the app, if they can find them…
              </p>
            </Column>
          </Row>
          <VSpace.Small />
          <Row rtl>
            <Column size={2} sSize={12}>
              <StyledHexagon>
                <Location size={4} />
              </StyledHexagon>
            </Column>
            <Column size={6} mSize={10} sSize={12}>
              <h3>Break out of the screen with location based puzzles</h3>
              <p>
                Send players en route to cool locations searching for hidden
                hints.
              </p>
            </Column>
          </Row>
          <VSpace.Small />
          <Row>
            <Column size={2} sSize={12}>
              <StyledHexagon>
                <Friend size={4} />
              </StyledHexagon>
            </Column>
            <Column size={6} mSize={10} sSize={12}>
              <h3>Play is more fun together</h3>
              <p>
                Distribute information necessary for the puzzles among your
                friends and have the player play together with them.
              </p>
            </Column>
          </Row>
          <Align.Center>
            <Button
              onClick={() => navigate("/features")}
              size="medium"
              importance="secondary"
              color="primary"
            >
              View more features
            </Button>
          </Align.Center>
        </Wrapper>
      </Section>
      <Section id="signup">
        <Wrapper>
          <Align.Center>
            <h2>Subscribe for Beta access</h2>
            <p>Be the first to create your own unique puzzle games</p>
            <CTA />
          </Align.Center>
        </Wrapper>
      </Section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    demo: file(relativePath: { eq: "demo.png" }) {
      childImageSharp {
        fluid(maxWidth: 960, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
