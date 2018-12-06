import 'utils/RHLFix'

import React from 'react'
import styled from 'styled-components'
import { darken } from 'polished'

import { Link } from 'gatsby'

import Layout from 'components/Layout'

import { Align } from 'components/ui'
import { Logo } from 'components/icons'
import Header from 'components/Header'

import path from 'images/path.svg'
import down from 'images/down.svg'

const Subtitle = styled.p`

`

const HeaderLink = styled(Link)`
  padding: 1em 1em 1em 3em;
  font-weight: bold;

  color: ${props => props.primary
    ? props.theme.color.accent
    : '#fff'
  };

  &:hover {
    color: ${props => darken(.1, props.primary
      ? props.theme.color.accent
      : '#fff'
    )};
  }

  background: url(${props => props.icon}) no-repeat left 1em top 50% / 1.5em;
`

const Block = styled.div`
  min-height: 20vh;
  padding: 2em;

  background-color: #000;

  h2 {
    color: #fff;
  }
`

const LightLogo = styled(Logo)`
  color: #fff;
`

export default () => {
  return (
    <Layout>
      <Header>
        <Align.Center>
          <LightLogo size={8} />
          <h1>Make your gift a unique adventure with a personal scavenger gift hunt.</h1>
          <Subtitle>Create an unforgettable personalised scavenger hunt adventure for someone close to you, leading them to their gift.</Subtitle>
        </Align.Center>
        <Align.Center>
          <HeaderLink icon={path} primary to="/demo">Play a Demo Hunt</HeaderLink>
          <HeaderLink icon={down} to="#info">Learn more</HeaderLink>
        </Align.Center>
      </Header>
      <Block id="info">
        <Align.Center>
          <h2>More info soon...</h2>
        </Align.Center>
      </Block>
    </Layout>
  )
}
