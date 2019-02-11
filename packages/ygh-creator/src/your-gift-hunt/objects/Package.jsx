import React from "react"
import styled, { css } from "styled-components"
import _ from "utils"

import ObjectPart from "./ObjectPart"
import Item from "../items"

const Bottom = styled(ObjectPart)`
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  border-radius: 0.1em;

  background: radial-gradient(
    ${_.darken(0.1, "#b38d5c")},
    ${_.darken(0.15, "#b38d5c")}
  );
`

const Flap = styled(ObjectPart)`
  z-index: 1;

  width: 50%;
  height: 100%;

  border-radius: 0.1em 0.2em 0.2em 0.1em;

  &::before {
    width: 100%;
    height: 100%;

    box-shadow: inset 0.1em 0 0.2em #0009, inset -0.2em 0 0.1em -0.1em #0004;
  }

  transform-origin: 0 50%;

  &:nth-child(3) {
    left: 100%;
  }
  &:nth-child(5) {
    left: 50%;
    top: 50%;
  }
  &:nth-child(4) {
    right: 50%;
  }
  &:nth-child(6) {
    right: 0;
    bottom: 50%;
  }

  transition-property: transform, background-color;
  transition-duration: 0.8s;

  ${({ isOpen }) => css`
    ${isOpen
      ? css`
          background-color: ${_.darken(0.05, "#b38d5c")};

          &:nth-child(3),
          &:nth-child(4) {
            transition-delay: 0.6s;
          }

          transition-timing-function: cubic-bezier(0.6, 0.5, 0.35, 2.25);
        `
      : css`
          transition-timing-function: cubic-bezier(0.65, -1.25, 0.4, 0.5);

          &:nth-child(3),
          &:nth-child(4) {
            background-color: #b38d5c;
          }

          &:nth-child(5),
          &:nth-child(6) {
            background-color: ${_.darken(-0.05, "#b38d5c")};
            transition-delay: 0.6s;
          }
        `}

    &:nth-child(3) {
      transform: rotate(0deg) scale(${isOpen ? 0.5 : -1}, 1);
    }
    &:nth-child(5) {
      transform: rotate(90deg) scale(${isOpen ? 0.5 : -1}, 1);
    }
    &:nth-child(4) {
      transform: rotate(180deg) scale(${isOpen ? 0.5 : -1}, 1);
    }
    &:nth-child(6) {
      transform: rotate(270deg) scale(${isOpen ? 0.5 : -1}, 1);
    }
  `}
`

const ItemContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 2em;
  height: 2em;
  margin: auto;
`

const Package = ({ state, otherProps }) => {
  const isOpen = state === "open"
  const isEmpty = state === "empty"

  return (
    <>
      <Bottom z={1.5} />
      {!isEmpty && (
        <ItemContainer>
          <Item {...otherProps} />
        </ItemContainer>
      )}
      <Flap isOpen={isOpen} z={0} />
      <Flap isOpen={isOpen} z={0} />
      <Flap isOpen={isOpen} z={0} />
      <Flap isOpen={isOpen} z={0} />
    </>
  )
}
Package.entityName = "Package"
Package.width = 3.5
Package.height = 3.5

export default Package
