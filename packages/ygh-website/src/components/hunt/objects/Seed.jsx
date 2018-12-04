import React, { useContext, useRef, useEffect, memo } from 'react'
import styled from 'styled-components'

import StoreContext from 'contexts/Store'

import Draggable, { dragStyles } from 'components/Draggable'

const Seed = memo(styled.div`
  position: relative;

  box-shadow: none !important;

  &::before {
    content: '';
    display: block;
    width: 5vw;
    height: 5vw;

    border-radius: 100% 100% 0 100%;

    background-image:
      radial-gradient(ellipse 40% 40% at 50% 50%, transparent, #362d2b),
      linear-gradient(45deg,
        transparent 30%, #fff 30%,
        #fff 36%, transparent 36%,
        transparent 47%, #fff 47%,
        #fff 53%, transparent 53%,
        transparent 64%, #fff 64%,
        #fff 70%, transparent 70%
      );
    background-color: #362d2b;

    transform: skew(15deg, 15deg);
  }

  ${dragStyles(.5)}
`)

export default () => {
  const { write } = useContext(StoreContext)
  const seedEl = useRef(null)

  useEffect(() => {
    write('seed', position => position
      ? position
      : { x: 0, y: 0 }
    )
  }, [])

  function setLightPosition() {
    if (seedEl.current) {
      const rect = seedEl.current.getClientRects()[0]
      write('seed', {
        x: rect.x + rect.width / 2,
        y: rect.y + rect.height / 2,
      })
    }
  }

  function handleOnDrag() {
    setLightPosition()
  }

  return (
    <Draggable
      id={`seed`}
      persistent
      rotates
      onDrag={handleOnDrag}
      initialTranslation={{ x: 50, y: 50 }}
      component={dragProps => (
        <Seed
          {...dragProps}
          ref={seedEl}
        />
      )}
    />
  )
}
