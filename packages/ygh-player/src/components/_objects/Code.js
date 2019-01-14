import React, { useRef, useContext, useEffect } from 'react'
import styled from 'styled-components'

import StoreContext from 'contexts/store'

import code from 'assets/code.svg'

const Code = styled.div`
  pointer-events: none;

  position: absolute;
  left: 30vw; top: 0;

  width: 30vw;
  height: 30vw;

  opacity: ${props => props.visible ? 1 : 0};

  mask: radial-gradient(circle closest-side, #fff 10%, transparent) no-repeat 30vw 30vw;

  background: url(${code}) no-repeat center / 10vw;

  will-change: mask-position;
`

export default () => {
  const { read } = useContext(StoreContext)
  const codeEl = useRef(null)
  const { lightPosition, lampState } = read('lamp', {
    lightPosition: { x: 0, y : 0 },
    lampState: false
  })

  useEffect(() => {
    if (codeEl.current) {
      codeEl.current.style =
        `-webkit-mask-position: calc(${lightPosition.x}px - 45vw) calc(${lightPosition.y}px - 15vw)`
    }
  }, [codeEl.current, lightPosition, lampState])

  return (
    <Code
      visible={lampState}
      ref={codeEl}
    />
  )
}
