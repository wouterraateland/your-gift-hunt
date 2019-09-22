import React, { useEffect, useRef, useState } from "react"
import styled, { css, keyframes } from "styled-components"
import { transparentize } from "polished"

import useGame from "hooks/useGame"
import useEditor from "hooks/useEditor"
import useSaveState from "hooks/useSaveState"
import useGameMutations from "hooks/useGameMutations"
import useMetaActions from "hooks/useMetaActions"
import { useClickOutside, useForceUpdate } from "ygh-hooks"

import * as Icons from "ygh-icons"
import { Button, ToolTip, Field } from "ygh-ui"

import PageContainer from "components/PageContainer"
import Nav from "components/CreatorNav"

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

const Editable = ({ onChange, value }) => {
  const ref = useRef(null)
  const [isEditing, setEditing] = useState(false)
  const [state, setState] = useState(value)

  const onSubmit = () => {
    onChange(state)
    setEditing(false)
  }

  useClickOutside({ ref, onClickOutside: isEditing ? onSubmit : () => {} })

  const onKeyPress = event => {
    if (event.key === "Enter") {
      onSubmit()
    }
  }

  return isEditing ? (
    <Field
      ref={ref}
      size="tiny"
      value={state}
      onKeyPress={onKeyPress}
      onChange={event => setState(event.target.value)}
    />
  ) : (
    <strong style={{ cursor: "pointer" }} onClick={() => setEditing(true)}>
      {value}
    </strong>
  )
}

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

const Center = styled.div`
  margin: 1rem 0;
`

const SwitchContainer = styled.div`
  display: flex;

  line-height: 1;

  box-shadow: inset 0 0 0 1px #0002;
  border-radius: ${props => props.theme.borderRadius};

  background-color: #fff;
`

const StyledSwitch = styled.div`
  cursor: pointer;

  padding: 0.5rem;

  &:hover {
    color: ${props => props.theme.color.primary};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px
      ${props => transparentize(0.5)(props.theme.color.primary)};
  }

  &:first-of-type {
    border-radius: ${props =>
      `${props.theme.borderRadius} 0 0 ${props.theme.borderRadius}`};
  }

  &:last-of-type {
    border-radius: ${props =>
      `0 ${props.theme.borderRadius} ${props.theme.borderRadius} 0`};
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

const Switch = ({ onSelect, ...props }) => (
  <StyledSwitch
    tabIndex={0}
    onClick={onSelect}
    onKeyPress={onSelect}
    {...props}
  />
)

const ViewSwitch = () => {
  const { selectView, selectedView, VIEW_TYPES } = useEditor()

  return (
    <SwitchContainer>
      <Switch
        onSelect={() => selectView(VIEW_TYPES.LOGIC)}
        isSelected={selectedView === VIEW_TYPES.LOGIC}
      >
        Logic
      </Switch>
      <Switch
        onSelect={() => selectView(VIEW_TYPES.GRAPHIC)}
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
  const { updateGameSettings } = useGameMutations()
  const { setUpcomingAction, ACTION_TYPES } = useEditor()
  const { testGame } = useMetaActions(game)

  return (
    <PageContainer>
      <Nav.Container>
        <Nav.BackControl />
        <Nav.Center>
          <Center>
            {game.creator.name} /{" "}
            <Editable
              onChange={value =>
                updateGameSettings(game.id, {
                  name: value
                })
              }
              value={game.name}
            />
          </Center>
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
