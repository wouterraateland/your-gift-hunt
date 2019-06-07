import styled from "styled-components"
import { Link } from "@reach/router"

export const MenuContainer = styled.div`
  position: relative;
  display: inline-block;
  vertical-align: middle;
`

export const MenuItem = styled(Link)`
  cursor: pointer;

  display: block;
  padding: 0.5em;

  text-decoration: none;
  text-align: left;

  &:nth-child(2n) {
    background: #0001;
  }

  &:hover {
    background: #0002;
  }

  color: ${props =>
    (props.color && props.theme.color[props.color]) || "currentColor"};
`

const MenuToggle = styled.div`
  position: relative;
  width: 2em;
  height: 2em;

  color: ${props => props.theme.color.text};

  ${MenuContainer}:hover & {
    color: ${props => props.theme.color.emphasis};
  }

  &::before {
    content: "";

    position: absolute;
    left: 50%;
    top: 50%;

    width: 0.25em;
    height: 0.25em;

    border-radius: 0.25em;
    box-shadow: 0 -0.5em, 0 0.5em;

    background: currentColor;

    transform: translate(-50%, -50%);
  }
`

export const MenuItems = styled.div`
  position: absolute;
  right: calc(50% - 1em);
  top: calc(100% + 1em);
  z-index: 3;

  width: 12em;
  padding: .25em 0;

  border-radius: ${props => props.theme.borderRadius}
  box-shadow: 0 0 60em 60em #0000;

  background: #fff;

  transform-origin: 90% 0;
  transform: scale(0);

  transition: transform 0.2s 0.2s ease-out, box-shadow 0.2s 0s ease-out;

  &::before,
  &::after {
    content: "";

    position: absolute;
    display: block;
  }

  &::before {
    position: absolute;
    left: 0;
    top: -2em;
    right: 0;
    bottom: 100%;
  }

  &::after {
    top: 0;
    right: 1em;

    width: 0.7em;
    height: 0.7em;

    border-style: solid;
    border-width: 0.35em;
    border-color: #fff transparent transparent #fff;
    border-top-left-radius: 0.125em;

    transform: translate(50%, -50%) rotate(45deg);
  }

  ${MenuContainer}:hover & {
    box-shadow: 0 0 60em 60em #0004;

    transform: scale(1);

    transition: transform 0.2s 0s ease-out, box-shadow 1s 0.2s ease-out;
  }
`

const Menu = {
  Container: MenuContainer,
  Items: MenuItems,
  Item: MenuItem,
  Toggle: MenuToggle
}

export default Menu
