import React, { useEffect } from "react"
import styled, { css, keyframes } from "styled-components"

import useGame from "hooks/useGame"
import useEditor from "hooks/useEditor"
import useSaveState from "hooks/useSaveState"
import useMetaActions from "hooks/useMetaActions"
import { useForceUpdate } from "ygh-hooks"

import * as Icons from "ygh-icons"
import { Button, ToolTip } from "ygh-ui"

import PageContainer from "components/PageContainer"
import Nav from "components/CreatorNav"

const Editable = styled.strong``

const Main = styled.main`
  position: relative;
  display: flex;
  flex-direction: row;

  flex-grow: 1;

  overflow: hidden;
`

const rotate = keyframes`
  to { transform: rotate(1turn); }
`

const SaveContainer = styled.span`
  position: relative;

  display: inline-block;
  width: 1em;
  height: 1em;
  margin: 0.3em 0 0 0.5em;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    margin: auto;
    border-radius: 100%;

    ${props =>
      props.isSaving
        ? css`
            width: 1em;
            height: 1em;

            border: 0.1em solid #0009;
            border-bottom-color: transparent;

            animation: ${rotate} 1s linear infinite;
          `
        : css`
            width: 0.5em;
            height: 0.5em;

            background-color: ${props.isDirty
              ? props.theme.color.error
              : props.theme.color.success};
          `}
  }
`

const SaveState = ({ isSaving, isDirty, lastSaved }) => {
  const forceUpdate = useForceUpdate()

  useEffect(() => {
    const i = setInterval(forceUpdate, 5000)
    return () => {
      clearInterval(i)
    }
  })

  return (
    <SaveContainer isSaving={isSaving} isDirty={isDirty}>
      <ToolTip right>
        {isSaving
          ? `Saving...`
          : isDirty
          ? `Unsaved changes. Last saved at ${lastSaved.fromNow()}`
          : `No unsaved changes`}
      </ToolTip>
    </SaveContainer>
  )
}

const SwitchContainer = styled.div`
  display: flex;

  line-height: 1;

  box-shadow: inset 0 0 0 1px #0002;
  border-radius: ${props => props.theme.borderRadius};

  background-color: #fff;
`

const Switch = styled.div`
  cursor: pointer;

  padding: 0.5rem;

  &:hover {
    color: ${props => props.theme.color.primary};
  }

  ${props =>
    props.isSelected &&
    css`
      color: ${props.theme.color.primary};
    `}

  & + & {
    border-left: 1px solid #0002;
  }
`

const ViewSwitch = () => {
  const { selectView, selectedView, VIEW_TYPES } = useEditor()

  return (
    <SwitchContainer>
      <Switch
        onClick={() => selectView(VIEW_TYPES.LOGIC)}
        isSelected={selectedView === VIEW_TYPES.LOGIC}
      >
        Logic
      </Switch>
      <Switch
        onClick={() => selectView(VIEW_TYPES.GRAPHIC)}
        isSelected={selectedView === VIEW_TYPES.GRAPHIC}
      >
        Floor plan
      </Switch>
    </SwitchContainer>
  )
}

const CreatorLayout = ({ children }) => {
  const { isSaving, isDirty, lastSaved } = useSaveState()
  const { game } = useGame()
  const { setUpcomingAction, ACTION_TYPES } = useEditor()
  const { testGame } = useMetaActions(game)

  return (
    <PageContainer>
      <Nav.Container>
        <Nav.BackControl />
        <Nav.Center>
          <p>
            {game.creator.name} / <Editable>{game.name}</Editable>
          </p>
          <SaveState
            isSaving={isSaving}
            isDirty={isDirty}
            lastSaved={lastSaved}
          />
        </Nav.Center>
        <ViewSwitch />
        <Nav.Items>
          <Nav.Item>
            <Button
              color="primary"
              importance="primary"
              size="small"
              onClick={testGame}
              lead={<Icons.Play />}
            >
              Test
            </Button>
          </Nav.Item>
          <Nav.Item>
            <Button
              color="primary"
              importance="secondary"
              size="small"
              lead={<Icons.Share />}
              onClick={() => {
                const targetType = game.publishedAt
                  ? ACTION_TYPES.SHARE_GAME
                  : ACTION_TYPES.PUBLISH_GAME

                setUpcomingAction(upcomingAction =>
                  upcomingAction && upcomingAction.type === targetType
                    ? null
                    : { type: targetType }
                )
              }}
            >
              {game.publishedAt ? "Share" : "Publish"}
            </Button>
          </Nav.Item>
        </Nav.Items>
      </Nav.Container>
      <Main>{children}</Main>
    </PageContainer>
  )
}

export default CreatorLayout
