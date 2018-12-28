import React from 'react'
import styled from 'styled-components'

import { Wrapper, Align } from 'your-gift-hunt/ui'
import { Logo } from 'your-gift-hunt/icons'

const Center = styled.div`
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
`

const LogoWithMargin = styled(Logo)`
  margin: 1.58em;

  color: #000;
  .background { fill: #fff; }
`

export default ({ children }) => {
  return (
    <Center>
      <Align.Center>
        <LogoWithMargin size={6} />
      </Align.Center>
      <div>
        <Wrapper small>
          {children}
        </Wrapper>
      </div>
    </Center>
  )
}
