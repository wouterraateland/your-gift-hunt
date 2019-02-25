import React from "react"
import styled from "styled-components"
import { Link } from "@reach/router"

import { Wrapper, Float } from "your-gift-hunt/ui"
import { Logo } from "your-gift-hunt/icons"

import Profile from "components/Profile"

const NavBackground = styled.nav`
  position: relative;
  height: 12em;
  padding: 1em ${props => (props.compact ? 1 : 0)}em;
  margin-bottom: -${props => (props.compact ? 8 : 7)}em;

  flex-shrink: 0;

  background-color: ${props => props.theme.color.accent};
`

const StyledLogo = styled(Logo)`
  color: #000;
  .background {
    fill: #fff;
  }
`

const Title = styled.h1`
  display: inline-block;
  margin: 0 0 0 1ch;
  line-height: ${props => (props.compact ? 2 : 3)}rem;

  font-weight: bold;
`
const Center = styled.div`
  position: absolute;
  left: 50%;
  top: 2em;

  transform: translate(-50%, -50%);
`

const NavItem = styled(Link)`
  cursor: pointer;

  display: inline-block;
  margin-right: 1em;
  padding: 0.5em 0;

  vertical-align: middle;
  font-weight: bold;
`

const NavContainer = ({ compact, children }) =>
  compact ? (
    <NavBackground compact>{children}</NavBackground>
  ) : (
    <NavBackground>
      <Wrapper>{children}</Wrapper>
    </NavBackground>
  )

const Nav = ({ title, children, items = [], compact }) => {
  return (
    <NavContainer compact={compact}>
      <Float.Left>
        <Link to="/">
          <StyledLogo size={compact ? 2 : 3} />
        </Link>
        <Title compact={compact}>{title}</Title>
      </Float.Left>
      <Center>{children}</Center>
      <Float.Right>
        {items.map(({ label, ...item }, i) => (
          <NavItem key={i} {...item}>
            {label}
          </NavItem>
        ))}
        {!compact && <Profile />}
      </Float.Right>
    </NavContainer>
  )
}

export default Nav
