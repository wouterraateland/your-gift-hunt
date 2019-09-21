import React, { useCallback, useState } from "react"
import styled from "styled-components"

import Icons from "ygh-icons"
import { ActionButton, Field } from "ygh-ui"

import TemplateSets from "./TemplateSets"

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

const Footer = styled.div`
  position: relative;
  padding: 0.5rem;
`

const EntityExplorer = () => {
  const [filter, setFilter] = useState("")
  const openTemplateSetManager = useCallback(() => {}, [])

  return (
    <Container>
      <Header>
        <Title>Packs</Title>
        <Actions>
          <ActionButton
            color="primary"
            onClick={() => openTemplateSetManager()}
          >
            <Icons.Plus />
          </ActionButton>
        </Actions>
      </Header>
      <Body>
        <TemplateSets filter={filter} />
      </Body>
      <Footer>
        <Field
          block
          value={filter}
          onChange={event => setFilter(event.target.value)}
          type="search"
          lead={<Icons.Loop />}
          placeholder="Filter..."
        />
      </Footer>
    </Container>
  )
}

export default EntityExplorer
