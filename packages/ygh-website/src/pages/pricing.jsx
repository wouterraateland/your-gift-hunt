import React from "react"
import styled from "styled-components"

import {
  Align,
  Column,
  Paper,
  Row,
  Section,
  VSpace,
  Wrapper
} from "your-gift-hunt/ui"

import Layout from "components/Layout"
import Hexagon from "components/Hexagon"

const StyledHexagon = styled(Hexagon)`
  margin: 2em auto 3em;
  h2 {
    margin: 0 0 0.2em;

    sup {
      color: ${props => props.theme.color.text};
    }
  }
`

const Banner = styled.span`
  display: inline-block;
  padding: 0.25em 0.5em;
  margin: -0.5em 0 0.5em;
  border-radius: ${props => props.theme.borderRadius};
  font-size: 0.75em;

  background: ${props => props.theme.color.accent};

  sup {
    font-size: 1.33em;
    font-weight: bold;
    vertical-align: -0.4em;
  }
`

const CheckList = styled.ul`
  text-align: left;
  margin: 0 -1em;
`

const Item = styled.li`
  display: block;
  padding: 0.5em 0.5em 0.5em 2.5em;
  margin: 0;

  &:nth-child(2n + 1) {
    background-color: #00000009;
  }

  &::before {
    content: "✓";

    display: inline-block;
    margin-left: -1.5em;
    width: 1.5em;

    color: ${props => props.theme.color.primary};
  }
`

export default () => (
  <Layout>
    <Section id="pricing">
      <Wrapper>
        <Align.Center>
          <h1>Simple pricing for your games</h1>
        </Align.Center>
        <VSpace />
        <Row vAlign="top">
          <Column size={4} mSize={6} sSize={12}>
            <Paper>
              <Paper.Section>
                <Align.Center>
                  <strong>Public Game</strong>
                  <StyledHexagon>
                    <h2>Free</h2>
                  </StyledHexagon>
                  <CheckList>
                    <Item>Create your own unique escape game</Item>
                    <Item>
                      Choose, modify and combine puzzles from our large library
                    </Item>
                    <Item>Easily test your game during creation</Item>
                  </CheckList>
                </Align.Center>
              </Paper.Section>
            </Paper>
          </Column>
          <Column size={4} mSize={6} sSize={12}>
            <Paper>
              <Paper.Section>
                <Align.Center>
                  <Banner>
                    <sup>*</sup>Special Beta Discount
                  </Banner>
                  <br />
                  <strong>Private Game</strong>
                  <StyledHexagon>
                    <h2>
                      5,-<sup>*</sup>
                    </h2>
                  </StyledHexagon>
                  <CheckList>
                    <Item>...Everything from public game</Item>
                    <Item>Share your game only with who you want</Item>
                    <Item>
                      Include triggers to unlock puzzles only at specific
                      locations or times
                    </Item>
                    <Item>Involve your friends with coop puzzles</Item>
                    <Item>
                      Expand the game beyond the screen with code scan puzzles
                    </Item>
                  </CheckList>
                </Align.Center>
              </Paper.Section>
            </Paper>
          </Column>
        </Row>
      </Wrapper>
    </Section>
  </Layout>
)
