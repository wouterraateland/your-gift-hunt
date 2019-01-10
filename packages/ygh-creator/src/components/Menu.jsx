import styled from 'styled-components'

export const MenuContainer = styled.div`
  position: relative;
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
    content: '';

    position: absolute;
    left: 50%; top: 50%;

    width: .3em;
    height: .3em;

    border-radius: 100%;
    box-shadow: 0 -.6em, 0 .6em;

    background: currentColor;

    transform: translate(-50%, -50%);
  }
`

export const Menu = styled.div`
  position: absolute;
  right: calc(50% - 1em); top: calc(100% + 1em);
  z-index: 3;

  width: 16em;

  box-shadow: 0 0 60em 60em #0000;

  background: #fff;

  transform-origin: 90% 0;
  transform: scale(0);

  transition:
    transform .2s .2s ease-out,
    box-shadow .2s 0s ease-out;

  &::before,
  &::after {
    content: '';

    position: absolute;
    display: block;
  }

  &::before {
    position: absolute;
    left: 0; top: -2em;
    right: 0; bottom: 100%;
  }

  &::after {
    right: .675em;
    top: -.3375em;

    width: .7em;
    height: .7em;

    border-style: solid;
    border-width: .35em;
    border-color: #fff transparent transparent #fff;
    border-top-left-radius: .125em;

    transform: rotate(45deg);
  }

  ${MenuContainer}:hover & {
    box-shadow: 0 0 60em 60em #0004;

    transform: scale(1);

    transition:
      transform .2s 0s ease-out,
      box-shadow 1s .2s ease-out;
  }
`

Menu.Container = MenuContainer
Menu.Item = MenuItem
Menu.Toggle = MenuToggle

export default Menu
