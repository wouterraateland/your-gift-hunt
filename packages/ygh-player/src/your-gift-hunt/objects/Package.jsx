import React from 'react'
import styled, { css } from 'styled-components'
import _ from 'utils'

import PhysicalObject from './PhysicalObject'

const Bottom = styled(PhysicalObject.Part)`
  left: 0; top: 0; right: 0; bottom: 0;

  border-radius: .1em;

  background: radial-gradient(
    ${_.darken(.1, '#b38d5c')},
    ${_.darken(.15, '#b38d5c')}
  )
`

const Flap = styled(PhysicalObject.Part)`
  width: 1.75em;
  height: 3.5em;

  border-radius: .1em .2em .2em .1em;

  &::before {
    width: 100%;
    height: 100%;

    box-shadow:
      inset .1em 0 .2em #0009,
      inset -.2em 0 .1em -.1em #0004;
  }

  transform-origin: 0 50%;

  &:nth-child(2) { left: 100%; }
  &:nth-child(4) { left: 50%; top: 50%; }
  &:nth-child(3) { right: 50%; }
  &:nth-child(5) { right: 0; bottom: 50%; }

  transition-property: transform, background-color;
  transition-duration: .8s;

  ${({ isOpen }) => css`
    ${isOpen
      ? css`
        background-color: ${_.darken(.05, '#b38d5c')};

        &:nth-child(2),
        &:nth-child(3) {
          transition-delay: .6s;
        }

        transition-timing-function: cubic-bezier(.6, .5, .35, 2.25);
      `
      : css`
        transition-timing-function: cubic-bezier(.65, -1.25, .4, .5);

        &:nth-child(2),
        &:nth-child(3) {
          background-color: #b38d5c;
        }

        &:nth-child(4),
        &:nth-child(5) {
          background-color: ${_.darken(-.05, '#b38d5c')};
          transition-delay: .6s;
        }
      `
    }

    &:nth-child(2) {
      transform: rotate(0deg) scale(${isOpen ? .5 : -1}, 1);
    }
    &:nth-child(4) {
      transform: rotate(90deg) scale(${isOpen ? .5 : -1}, 1);
    }
    &:nth-child(3) {
      transform: rotate(180deg) scale(${isOpen ? .5 : -1}, 1);
    }
    &:nth-child(5) {
      transform: rotate(270deg) scale(${isOpen ? .5 : -1}, 1);
    }
  `}
`

const Package = (props) => {
  const isOpen = _.hasState('package', 'open')(props)

  return (
    <PhysicalObject width={3.5} height={3.5} {...props}>
      <Bottom z={1.5} />
      <Flap isOpen={isOpen} z={0} />
      <Flap isOpen={isOpen} z={0} />
      <Flap isOpen={isOpen} z={0} />
      <Flap isOpen={isOpen} z={0} />
    </PhysicalObject>
  )
}
Package.entityId = 'package'

export default Package
