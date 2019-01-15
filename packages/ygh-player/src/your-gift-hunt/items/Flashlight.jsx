import React, { forwardRef } from 'react'
import styled, { css } from 'styled-components'

import _ from 'utils'

import Item from './Item'

const FlashlightBody = styled(Item)`
  width: 2em;
  height: .5em;

  border-radius: .1em;

  background:
    radial-gradient(
      ellipse 30% 20% at 40% 35%,
      #fff9, transparent
    ),
    linear-gradient(
      90deg,
      #444 20%, #ffd65a 20%
    );

  transform: rotate(-45deg);

  &::before {
    ${props => props.state === 'on'
      ? css`
        left: 100%;
        top: 50%;

        width: .75em;
        height: .75em;

        background:
          radial-gradient(
            ellipse 100% 50% at 0% 50%, #b9e6ff, transparent
          );

        transform: translate(0, -50%);
      `
      : css`
        left: .45em;
        bottom: 100%;

        width: .7em;
        height: ${props.state === 'empty' ? .3 : 0}em;

        border-radius: .1em .1em 0 0;

        background:
          linear-gradient(#222, #444);
      `
    }
  }

  &::after {
    right: 0;
    top: -.125em;

    width: .75em;
    height: .75em;

    border-radius: .5em .1em .1em .5em / .125em .1em .1em .125em;

    background:
      radial-gradient(
        ellipse 40% 20% at 40% 35%,
        #fff9, transparent
      ),
      linear-gradient(
        90deg,
        #ffd65a 60%, #444 60%
      );
  }

  &, &::after {
    box-shadow:
      inset 0 -.2em .4em -.2em #000,
      inset 0 .1em .2em -.1em #0009;
  }
`
FlashlightBody.displayName = "FlashlightBody"

const FlashlightButton = styled.div`
  cursor: pointer;

  position: absolute;
  left: 45%; top: 50%;

  width: .3em;
  height: .2em;
  border-radius: 100%;

  background:
    radial-gradient(
      ellipse 50% 50% at 50% 50%,
      #000, #444
    );

  transform: translate(-50%, -50%);
`

const Flashlight = forwardRef(({ state }, refs) => {
  const powerButton = refs ? refs.powerButton : null

  return (
    <FlashlightBody state={state}>
      <FlashlightButton ref={powerButton} />
    </FlashlightBody>
  )
})

Flashlight.defaultProps = {
  onTransform: _.noop
}

export default Flashlight

export const itemId = 'flashlight'
