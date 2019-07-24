import React from "react"
import styled from "styled-components"

import useEntities from "hooks/useEntities"
import EntityTree from "./EntityTree"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f2f2f2;
`

const Header = styled.div`
  height: 2rem;
  padding: 0.5rem;
`

const Title = styled.strong`
  display: block;

  line-height: 1;
  text-transform: uppercase;
  color: ${props => props.theme.color.caption};
`

const Body = styled.div`
  flex-grow: 1;
`

const EntityExplorer = () => {
  const { rootEntities } = useEntities()
  return (
    <Container>
      <Header>
        <Title>Explorer</Title>
      </Header>
      <Body>
        <EntityTree entities={rootEntities} />
      </Body>
    </Container>
  )
}

export default EntityExplorer
