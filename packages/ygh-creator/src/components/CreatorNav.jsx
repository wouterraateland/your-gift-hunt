import styled from "styled-components"
import { darken } from "polished"
import { Link } from "@reach/router"

const Container = styled.nav`
  position: relative;
  z-index: 1;

  display: flex;
  height: calc(3em + 1px);
  border-bottom: 1px solid #0002;

  align-items: center;
  flex-shrink: 0;

  white-space: nowrap;

  background-color: #f9f9f9;
`

const BackControl = styled(Link)`
  cursor: pointer;
  position: relative;

  display: inline-block;
  width: 3em;
  height: 3em;

  &::after {
    content: "";

    position: absolute;
    top: 0.875em;
    left: 0.75em;

    width: 1.5em;
    height: 0.5em;
    border-radius: 2px;
    box-shadow: 0 0.75em;

    background-color: currentColor;
  }

  &:hover {
    color: ${props => props.theme.color.emphasis};
  }
`
BackControl.defaultProps = {
  to: "/"
}

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  flex-grow: 1;
`

const Item = styled.div`
  margin: 0.5em;

  @media (max-width: 30rem) {
    display: block;
    width: 15em;
    margin-left: -12em;
    border: none;

    background-color: ${props => props.theme.color.secondary};

    &:hover {
      background-color: ${props => darken(0.1)(props.theme.color.secondary)};
    }
  }
`

const Items = styled.div`
  display: flex;

  @media (max-width: 30rem) {
    display: block;
    position: relative;

    width: 3em;
    padding-top: calc(3em + 1px);

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
  Items,
  Item
}

export default Nav
