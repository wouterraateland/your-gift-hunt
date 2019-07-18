import React, { useEffect } from "react"
import styled, { css, keyframes } from "styled-components"
import { Link } from "@reach/router"

import useGame from "hooks/useGame"
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

const CreatorLayout = ({ children }) => {
  const { isSaving, isDirty, lastSaved } = useSaveState()
  const { game } = useGame()
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
        <Nav.Items>
          <Nav.Item>
            <Button
              color="primary"
              importance="primary"
              size="small"
              onClick={testGame}
            >
              <Icons.Play /> Test
            </Button>
          </Nav.Item>
          <Nav.Item>
            <Button
              color="primary"
              importance="secondary"
              size="small"
              as={Link}
              to={game.publishedAt ? "published" : "publish"}
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
