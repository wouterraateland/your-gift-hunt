import React, { useContext, useCallback, useEffect } from "react"
import styled from "styled-components"

import InspectorContext from "contexts/Inspector"
import EditorContext from "contexts/Editor"
import GameContext from "contexts/Game"

import { Button } from "your-gift-hunt/ui"
import { Bin } from "your-gift-hunt/icons"

const Container = styled.div`
  margin-top: 1em;
`

const Info = styled.small`
  display: inline-block;
  margin-top: 0.5em;

  opacity: 0.5;

  &::before {
    content: "i";

    display: inline-block;
    width: 1.2em;
    height: 1.2em;
    margin-right: 0.5em;
    border-radius: 100%;

    text-align: center;
    font-style: italic;

    background: #0002;
  }
`

const DeleteButton = ({ node, isOpen }) => {
  const { closeInspector } = useContext(InspectorContext)
  const { ACTION_TYPES, upcomingAction, setUpcomingAction } = useContext(
    EditorContext
  )
  const { getDependentNodes } = useContext(GameContext)

  useEffect(
    () => {
      return () => {
        setUpcomingAction(null)
      }
    },
    [node, isOpen]
  )

  const isDeleting =
    upcomingAction &&
    upcomingAction.type === ACTION_TYPES.DELETE_NODE &&
    upcomingAction.payload.node === node.id

  const onClick = useCallback(
    () => {
      if (isDeleting) {
        closeInspector()
      } else {
        setUpcomingAction({
          type: ACTION_TYPES.DELETE_NODE,
          payload: {
            node: node.id,
            dependentNodes: getDependentNodes(node.id)
          }
        })
      }
    },
    [isDeleting, node]
  )

  return (
    <Container>
      <Button block onClick={onClick} color="error" importance="primary">
        <Bin />{" "}
        {isDeleting
          ? `Confirm deletion of ${
              upcomingAction.payload.dependentNodes.length
            } nodes`
          : "Delete node"}
      </Button>
      <Info>
        Deleting this node also deletes all nodes that are dependent on it.
      </Info>
    </Container>
  )
}

export default DeleteButton
