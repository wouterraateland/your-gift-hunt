import React from "react"
import styled from "styled-components"

const Outer = styled.div`
  width: 5em;
  height: 2.6em;
  position: relative;

  &,
  &::before,
  &::after {
    border-radius: ${props => props.theme.borderRadius};
    box-shadow: ${props => props.theme.boxShadow.small};
    background: ${props => props.theme.color.accent};
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 50%;

    width: 3em;
    height: 3em;

    transform: translate(-50%, -50%) rotate(55deg) skewY(-22.5deg);
  }

  &::before {
    top: 0.1em;
  }

  &::after {
    top: 2.5em;
  }

  & span {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 5em;
    height: 2.6em;
    border-radius: ${props => props.theme.borderRadius};

    background-color: ${props => props.theme.color.accent};
  }
`

const Inner = styled.span``

const Hexagon = ({ children, ...otherProps }) => (
  <Outer {...otherProps}>
    <Inner>{children}</Inner>
  </Outer>
)

export default Hexagon
