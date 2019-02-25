import React from "react"
import styled from "styled-components"
import StateTag from "../StateTag"

const Name = styled.h2`
  margin: 0;
`

const Description = styled.blockquote``

const Meta = ({
  node: {
    instance: { entity },
    state: { state }
  }
}) => (
  <>
    <Name>{entity.name}</Name>
    <StateTag>{state.name}</StateTag>
    <Description>
      {entity.description} {state.description}
    </Description>
  </>
)

export default Meta
