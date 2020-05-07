import React from "react"
import styled from "styled-components"
import { graphql, Link } from "gatsby"

import { Align, Button, Column, Paper, Row, Section, Wrapper } from "ygh-ui"

import Layout from "components/Layout"
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
  padding: 4em 0;
`

const GameThumb = styled.a`
  display: block;
`

const GameImage = styled.span`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  padding-top: 75%;

  @media (max-width: 45rem) {
    &:not(:empty) {
      padding: 1rem;
      & p {
        position: static;
        transform: none;
      }
    }
  }

  border-radius: ${props => props.theme.borderRadius};

  box-shadow: ${props => props.theme.boxShadow.medium};

  background: ${props => props.theme.color.secondary} url(${props => props.src})
    no-repeat center / cover;

  & p {
    position: absolute;
    top: 50%;
    left: 1rem;
    right: 1rem;

    margin: auto;

    text-align: left;
    font-size: 1.5rem;
    font-weight: 600;

    transform: translate(0, -50%);
    color: #000;
  }
`

const NoticePaper = styled(Paper)`
  padding: 1rem 3rem;
  border-left: 0.25rem solid ${props => props.theme.color.secondary};

  @media (max-width: 45rem) {
    padding: 0.25rem 1rem;
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
        <Wrapper.Medium>
          <Row>
            <Column size={6} mSize={12}>
              <h1>Escape Room Creator</h1>
              <Tagline>Create your own unique escape room games</Tagline>
            </Column>
            <Column size={6} mSize={12}>
              <Demo
                imageInfo={demoImageInfo}
                url="/play/cjx1pg342002007328lpe2xfb"
              />
            </Column>
          </Row>
        </Wrapper.Medium>
      </Header>
      <Section>
        <Wrapper.Small>
          <NoticePaper>
            <h2>NOTICE</h2>
            <p>
              Escape Room Creator is no longer maintained. This means that no
              new functionalities will be developed. You should still be able to
              play existing escape rooms and to create new escape rooms.
            </p>
            <p>
              If you like the project and are interested in developing it
              further, please contact me via the{" "}
              <Link to="/contact">contact page</Link>.
            </p>
          </NoticePaper>
        </Wrapper.Small>
      </Section>
      <Section id="process">
        <Wrapper.Medium>
          <Align.Center>
            <h2>How does it work?</h2>
            <Row>
              <Column size={4} mSize={6} sSize={12}>
                <h3>1. Create</h3>
                <img src={createImage} alt="create" />
                <p>
                  Visually design your escape room, add furniture, riddles and
                  puzzles from our collection of templates, and modify them to
                  your liking.
                </p>
              </Column>
              <Column size={4} mSize={6} sSize={12}>
                <h3>2. Share</h3>
                <img src={shareImage} alt="share" />
                <p>
                  Once you're done, you can publish your creation to the
                  showcase. From then it will be available for anyone to play
                  and you can share it with your friends!
                </p>
              </Column>
              <Column size={4} mSize={6} sSize={12}>
                <h3>3. Play</h3>
                <img src={playImage} alt="play" />
                <p>
                  Your game is instantly playable from its unique url. No
                  download required.
                </p>
              </Column>
            </Row>
          </Align.Center>
        </Wrapper.Medium>
      </Section>
      <Section id="showcase">
        <Wrapper.Medium>
          <Align.Center>
            <h2>Featured escape rooms</h2>
            <Row vAlign="top">
              <Column size={4} mSize={6} sSize={12}>
                <GameThumb href="/game/cjx1pg342002007328lpe2xfb">
                  <GameImage src="https://storage.googleapis.com/your-gift-hunt/escape_the_shed.png" />
                  <h3>Escape the Shed</h3>
                </GameThumb>
              </Column>
              <Column size={4} mSize={6} sSize={12}>
                <GameThumb href="/game/cjuzqsov5000e0770uhkdnchr">
                  <GameImage src="https://storage.googleapis.com/your-gift-hunt/1563373278559-galina-n-mizinqvjx5m-unsplash.jpg" />
                  <h3>Rescue mission: Carl's plant</h3>
                </GameThumb>
              </Column>
              <Column size={4} mSize={12}>
                <GameThumb href="/showcase">
                  <GameImage>
                    <p>Play more games in the showcase &rarr;</p>
                  </GameImage>
                </GameThumb>
              </Column>
            </Row>
          </Align.Center>
        </Wrapper.Medium>
      </Section>
      <Section id="signup">
        <Wrapper.Medium>
          <Align.Center>
            <h2>Ready to create?</h2>
            <p>Create your own escape room game now.</p>
            <Button
              size="large"
              color="primary"
              importance="primary"
              as="a"
              href="/new-game"
            >
              Create game
            </Button>
          </Align.Center>
        </Wrapper.Medium>
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
