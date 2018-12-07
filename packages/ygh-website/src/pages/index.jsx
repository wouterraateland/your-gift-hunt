import 'utils/RHLFix'

import React from 'react'
import styled from 'styled-components'
import { darken } from 'polished'

import { Link } from 'gatsby'

import Layout from 'components/Layout'

import { Align } from 'components/ui'
import { Logo } from 'components/icons'
import Header from 'components/Header'

import Path from 'components/icons/Path'
import Down from 'components/icons/Down'

const Subtitle = styled.p`

`

const HeaderLink = styled(Link)`
  padding: 1em;
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
  margin-bottom: 1.58em;
  
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
          <HeaderLink primary to="/demo"><Path size={1.5} />&nbsp;&nbsp;Play a Demo Hunt</HeaderLink>
          <HeaderLink to="#info"><Down size={1.5} />&nbsp;&nbsp;Learn more</HeaderLink>
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
