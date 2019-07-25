import React from "react"
import styled from "styled-components"

import useInspector from "hooks/useInspector"

import { ActionButton } from "ygh-ui"
import Icons from "ygh-icons"

const HeaderContainer = styled.div`
  position: relative;
  height: 2rem;
  padding: 0.5rem;
`

const Title = styled.strong`
  display: block;

  line-height: 1;
`

const Actions = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.25rem;
`

const Header = () => {
  const { closeInspector } = useInspector()

  return (
    <HeaderContainer>
      <Title>Inspector</Title>
      <Actions>
        <ActionButton onClick={closeInspector}>
          <Icons.Cross />
        </ActionButton>
      </Actions>
    </HeaderContainer>
  )
}

export default Header
