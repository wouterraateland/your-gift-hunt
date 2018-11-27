import { memo } from 'react'
import styled from 'styled-components'

const LightMap = styled.div`
  pointer-events: none;

  position: absolute;
  left: 0; top: 0;
  right: 0; bottom: 0;

  background-image:
    radial-gradient(ellipse 100vw 100vw at 50% 50%, transparent 40%, rgba(0, 0, 0, .5));

  z-index: 4;

  background-size: 100%;
`

export default memo(LightMap)
