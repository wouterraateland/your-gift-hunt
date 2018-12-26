import React from 'react'
import styled, { ThemeProvider } from 'styled-components'

import Wrapper from 'components/ui/Wrapper'

import { Row, Column, Hide } from 'components/ui'
import PreviewCompatibleImage from 'components/PreviewCompatibleImage'
import CTA from 'components/landing/CTA'

const Header = styled.header`
  padding: 8em 0 2em;
  margin: -8em 0 4em;

  @media (max-width: 45em) {
    height: 30em;
  }
`

const Title = styled.h1`
  max-width: 12.5em;

  @media (max-width: 45em) {
    color: #fff;
  }
`

const Subtitle = styled.p`
  max-width: 25em;

  @media (max-width: 45em) {
    color: #fffc;
  }
`

const StyledPreviewCompatibleImage = styled(PreviewCompatibleImage)`
  z-index: -1;

  @media (max-width: 45em) {
    height: 30em;
    margin: -8em -4em -22em -4em;

    clip-path: polygon(0 0, 100% 0, 100% 70%, 0 100%);

    &::after {
      content: '';

      position: absolute;
      left: 0; top: 0;
      right: 0; bottom: 0;

      background: linear-gradient(#0002 60%, #0009 80%);
    }
  }

  @media (min-width: 45em) {
    height: 40em;
    margin-right: -10em;
    margin-top: -10em;

    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 70%);
  }
`

export default ({ imageInfo }) => {
  return (
    <Header>
      <Wrapper xlarge>
          <Row rtl vAlign="top">
            <Column size={7} mSize={12}>
              <StyledPreviewCompatibleImage imageInfo={imageInfo}/>
            </Column>
            <Column size={5} mSize={12}>
              <Title>Make your gift a unique adventure with a personal scavenger gift hunt.</Title>
              <Subtitle>Create an unforgettable personalised scavenger hunt adventure for someone close to you, leading them to their gift.</Subtitle>
              <Hide.Not.Medium>
                <ThemeProvider theme={theme => ({
                  ...theme,
                  color: {
                    ...theme.color,
                    text: '#fff',
                  }
                })}>
                  <CTA />
                </ThemeProvider>
              </Hide.Not.Medium>
              <Hide.Medium>
                <CTA />
              </Hide.Medium>
            </Column>
          </Row>
      </Wrapper>
    </Header>
  )
}
