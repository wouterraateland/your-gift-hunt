import React from "react"
import styled from "styled-components"
import { Link } from "@reach/router"

import { Wrapper, Float } from "your-gift-hunt/ui"
import { Logo } from "your-gift-hunt/icons"

import Menu from "components/Menu"
import Profile from "components/Profile"

const NavBackground = styled.nav`
  position: relative;
  height: 12em;
  padding: 1em ${props => (props.compact ? 1 : 0)}em;
  margin-bottom: -${props => (props.compact ? 8 : 7)}em;

  flex-shrink: 0;

  background-color: ${props => props.theme.color.accent};
`

const BackArrow = styled.strong`
  display: inline-block;
  width: 1em;
  height: 1em;

  line-height: 0.9em;
  font-size: 2em;
  text-align: center;

  &:hover {
    background-color: #0001;
  }
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
  line-height: ${props => (props.compact ? 1 : "3rem")};

  font-weight: bold;
`
const Center = styled.div`
  position: absolute;
  left: 50%;
  top: 2em;

  transform: translate(-50%, -50%);

  @media (max-width: 35em) {
    display: none;
  }
`

const Small = styled.div`
  display: none;

  @media (max-width: 35em) {
    float: right;
    display: block;
  }
`

const NavItem = styled(Link)`
  cursor: pointer;

  display: inline-block;
  margin-right: 1em;
  padding: 0.5em 0;

  vertical-align: middle;
  font-weight: bold;
`

const FloatRight = styled(Float.Right)`
  @media (max-width: 35em) {
    display: none;
  }
`

const NavContainer = ({ compact, children }) =>
  compact ? (
    <NavBackground compact>{children}</NavBackground>
  ) : (
    <NavBackground>
      <Wrapper>{children}</Wrapper>
    </NavBackground>
  )

const Nav = ({ goBack, title, children, items = [], compact }) => {
  return (
    <NavContainer compact={compact}>
      <Float.Left>
        <Link to="/">
          {goBack ? (
            <BackArrow>&larr;</BackArrow>
          ) : (
            <StyledLogo size={compact ? 2 : 3} />
          )}
        </Link>
        <Title compact={compact}>{title}</Title>
      </Float.Left>
      <Center>{children}</Center>
      <FloatRight>
        {items.map(({ label, ...item }, i) => (
          <NavItem key={i} {...item}>
            {label}
          </NavItem>
        ))}
        {!compact && <Profile />}
      </FloatRight>
      {items.length > 0 && (
        <Small>
          <Menu.Container>
            <Menu.Toggle />
            <Menu>
              {items.map(({ label, ...item }, i) => (
                <Menu.Item key={i} {...item}>
                  {label}
                </Menu.Item>
              ))}
            </Menu>
          </Menu.Container>
        </Small>
      )}
    </NavContainer>
  )
}

export default Nav
