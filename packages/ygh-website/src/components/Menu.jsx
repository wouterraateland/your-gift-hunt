import React from "react"
import styled from "styled-components"
import { darken } from "polished"

import { Link } from "gatsby"

const MenuItemList = styled.div`
  display: none;
  z-index: 1;

  overflow: hidden;

  position: absolute;
  right: 0;
  top: 100%;

  max-width: calc(100vw - 4rem);
  width: 12em;

  border-radius: ${props => props.theme.borderRadius};
  box-shadow: ${props => props.theme.boxShadow.medium};

  background: #fff;
`

const StyledMenuItem = styled(Link)`
  display: block;
  padding: 0.5em;

  &:nth-child(2n) {
    background-color: #f5f6fb;
  }

  &:hover {
    background-color: #ebedf5;
  }
`
const MenuItem = props => (
  <StyledMenuItem as={props.href ? "a" : Link} {...props} />
)

const MenuToggle = styled.div`
  cursor: pointer;

  padding: 0.5em 0.65em;
  border-radius: ${props => props.theme.borderRadius};

  font-weight: bold;

  background-color: #ebedf5;
`

const Menu = styled.div`
  position: relative;

  margin: 0.2em 0;
  float: right;

  &:hover {
    & ${MenuToggle} {
      background-color: ${darken(0.05, "#ebedf5")};
    }

    & ${MenuItemList} {
      display: block;
    }
  }
`

Menu.Toggle = MenuToggle
Menu.ItemList = MenuItemList
Menu.Item = MenuItem

export default Menu
