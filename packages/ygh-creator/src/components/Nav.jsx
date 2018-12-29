import React from 'react'
import styled from 'styled-components'

import { Wrapper, Float } from 'your-gift-hunt/ui'
import { Logo } from 'your-gift-hunt/icons'

import Profile from 'components/Profile'

const StyledNav = styled.nav`
  height: 12em;
  padding: 1em 0;
  margin-bottom: -7em;

  background-color: ${props => props.theme.color.accent};
`

const StyledLogo = styled(Logo)`
  color: #000;
  .background { fill: #fff; }
`

const Title = styled.h1`
  display: inline-block;
  margin: 0 0 0 1ch;
  line-height: 3rem;

  font-weight: bold;
`

const Nav = () => {
  return (
    <StyledNav>
      <Wrapper>
        <Float.Left>
          <StyledLogo size={3} />
          <Title>Creator</Title>
        </Float.Left>
        <Float.Right>
          <Profile />
        </Float.Right>
      </Wrapper>
    </StyledNav>
  )
}

export default Nav
