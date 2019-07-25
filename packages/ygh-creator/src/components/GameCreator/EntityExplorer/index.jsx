import React from "react"
import styled from "styled-components"

import useEntities from "hooks/useEntities"
import useEditor from "hooks/useEditor"

import Icons from "ygh-icons"
import { ActionButton } from "ygh-ui"

import EntityTree from "./EntityTree"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f9f9f9;
`

const Header = styled.div`
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

const Body = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`

const EntityExplorer = () => {
  const { rootEntities } = useEntities()
  const { selectTab, INFO_TYPES } = useEditor()
  return (
    <Container>
      <Header>
        <Title>Explorer</Title>
        <Actions>
          <ActionButton
            color="primary"
            onClick={() => selectTab(INFO_TYPES.NEW_ENTITY)}
          >
            <Icons.Plus />
          </ActionButton>
        </Actions>
      </Header>
      <Body>
        <EntityTree entities={rootEntities} />
      </Body>
    </Container>
  )
}

export default EntityExplorer
