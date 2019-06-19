import React, { useCallback } from "react"
import styled from "styled-components"

import useInspector from "hooks/useInspector"

const Container = styled.div`
  pointer-events: ${props => (props.isVisible ? "none" : "initial")};

  position: absolute;
  top: -0.5em;
  left: -0.5em;
  bottom: -0.5em;
  right: -0.5em;
  z-index: ${props => (props.isVisible ? 1000 : 0)};

  opacity: ${props => (props.isVisible ? 1 : 0)};

  border: 0.1em solid ${props => props.theme.color.primary};
`

const SingleControl = styled.div`
  pointer-events: auto;

  position: absolute;
  top: ${props => (props.top ? 0 : props.bottom ? 100 : 50)}%;
  left: ${props => (props.left ? 0 : props.right ? 100 : 50)}%;

  width: 1em;
  height: 1em;

  text-align: center;
  line-height: 1;

  background-color: ${props => props.theme.color.primary};
  color: #fff;

  transform: translate(-50%, -50%);
`

const Resize = styled(SingleControl)`
  &::after {
    content: '${props => (props.horizontal ? "↔" : "↕")}';
  }
`

const Rotate = styled(SingleControl)`
  &::after {
    content: "↷";
  }
`

const Controls = ({ entity }) => {
  const { inspectEntity, isOpen, inspectedEntity } = useInspector()

  const handleClick = useCallback(
    event => {
      // event.stopPropagation()
      console.log(entity.name)
      inspectEntity(entity.id)
    },
    [entity.id]
  )

  return (
    <Container
      onClick={handleClick}
      isVisible={isOpen && inspectedEntity === entity.id}
    >
      <Resize vertical top />
      <Resize horizontal right />
      <Resize vertical bottom />
      <Resize horizontal left />
      <Rotate top left />
      <Rotate top right />
      <Rotate bottom right />
      <Rotate bottom left />
    </Container>
  )
}

export default Controls
