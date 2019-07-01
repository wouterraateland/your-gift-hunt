import React from "react"
import styled from "styled-components"
import { darken } from "polished"
import { Link } from "@reach/router"

const Container = styled.nav`
  position: relative;
  z-index: 1;

  display: flex;
  height: 3.1em;
  border-bottom: 0.1em solid #0001;

  flex-direction: row;
  flex-shrink: 0;

  white-space: nowrap;

  background-color: ${props => props.theme.color.accent};
`

const BackControlContainer = styled(Link)`
  cursor: pointer;
  display: inline-block;
  width: 1.5em;
  height: 1.5em;

  border-right: 0.1rem solid #0001;

  font-size: 2em;
  font-weight: bold;
  line-height: 1.4em;
  text-align: center;
  text-decoration: none;

  &:hover {
    background-color: #0001;
  }
`

const BackControl = ({ to = "/" }) => (
  <BackControlContainer to={to}>&larr;</BackControlContainer>
)

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  flex-grow: 1;
`

const Title = styled.h1`
  display: inline-block;
  max-width: calc(100% - 2ch - 4em);
  margin: 0 1ch;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  line-height: 1;
  font-weight: bold;
`

const Item = styled(Link)`
  cursor: pointer;

  display: inline-block;
  padding: 1em;
  border-left: 0.1em solid #0001;

  vertical-align: middle;
  font-weight: bold;
  line-height: 1;

  &:hover {
    background-color: #0001;
  }

  @media (max-width: 30rem) {
    display: block;
    width: 15em;
    margin-left: -12em;
    border: none;

    background-color: ${props => props.theme.color.accent};

    &:hover {
      background-color: ${props => darken(0.1)(props.theme.color.accent)};
    }
  }
`

const Items = styled.div`
  @media (max-width: 30rem) {
    position: relative;

    width: 3em;
    padding-top: 3.1em;
    border-left: 0.1em solid #0001;

    &:not(:hover) {
      ${Item} {
        display: none;
      }
    }

    &::before {
      content: "";
      position: absolute;
      top: 1em;
      left: 1em;

      width: 1em;
      height: 0.2em;

      box-shadow: 0 0.4em, 0 0.8em;

      background-color: currentColor;
    }
  }
`

const Nav = {
  Container,
  BackControl,
  Center,
  Title,
  Items,
  Item
}

export default Nav
