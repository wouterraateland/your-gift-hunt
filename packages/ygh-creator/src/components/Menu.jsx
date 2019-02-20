import styled from "styled-components"

export const MenuContainer = styled.div`
  position: relative;
  display: inline-block;
  vertical-align: middle;
`

export const MenuItem = styled.div`
  cursor: pointer;

  display: block;
  padding: 1em;

  text-decoration: none;

  &:nth-child(2n) {
    background: #0001;
  }

  &:hover {
    background: #0002;
  }
`

const MenuToggle = styled.div`
  position: relative;
  width: 2em;
  height: 2em;

  color: #0006;

  &:hover {
    color: #0008;
  }

  &::before {
    content: "";

    position: absolute;
    left: 50%;
    top: 50%;

    width: 0.3em;
    height: 0.3em;

    border-radius: 100%;
    box-shadow: 0 -0.6em, 0 0.6em;

    background: currentColor;

    transform: translate(-50%, -50%);
  }
`

export const Menu = styled.div`
  position: absolute;
  right: calc(50% - 1em);
  top: calc(100% + 1em);
  z-index: 3;

  width: 16em;

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
    right: 0.675em;
    top: -0.3375em;

    width: 0.7em;
    height: 0.7em;

    border-style: solid;
    border-width: 0.35em;
    border-color: #fff transparent transparent #fff;
    border-top-left-radius: 0.125em;

    transform: rotate(45deg);
  }

  ${MenuContainer}:hover & {
    box-shadow: 0 0 60em 60em #0004;

    transform: scale(1);

    transition: transform 0.2s 0s ease-out, box-shadow 1s 0.2s ease-out;
  }
`

Menu.Container = MenuContainer
Menu.Item = MenuItem
Menu.Toggle = MenuToggle

export default Menu
