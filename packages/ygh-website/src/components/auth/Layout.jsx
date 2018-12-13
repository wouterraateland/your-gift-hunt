import React from 'react'
import styled from 'styled-components'
import { transparentize } from 'polished'

import Theme from 'containers/Theme'

import { Wrapper, Align } from 'components/ui'
import { Logo } from 'components/icons'

const Center = styled.div`
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;

  box-shadow:
    inset 0 -.5em ${props => props.theme.color.accent},
    inset 0 -1em ${props => transparentize(.5, props.theme.color.accent)};
`

const LogoWithMargin = styled(Logo)`
  margin: 1.58em;
`

export default ({ children }) => {
  return (
    <Theme>
      <Center>
        <Align.Center>
          <LogoWithMargin size={6} />
        </Align.Center>
        <div>
          <Wrapper small>
            <article>
              {children}
            </article>
          </Wrapper>
        </div>
      </Center>
    </Theme>
  )
}
