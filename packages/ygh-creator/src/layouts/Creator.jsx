import React, { useEffect, useContext } from "react"
import styled from "styled-components"

import GameContext from "contexts/Game"

import useForceUpdate from "hooks/useForceUpdate"

import PageContainer from "components/PageContainer"
import Nav from "components/Nav"
import SettingsButton from "components/SettingsButton"

const Main = styled.main`
  position: relative;
  display: flex;
  flex-direction: row;

  flex-grow: 1;
`

const Light = styled.span`
  opacity: 0.5;
`

const SaveStateText = styled.span`
  cursor: pointer;

  display: inline-block;

  font-size: smaller;
  text-align: center;
`

const SaveState = ({ onClick, isSaving, isDirty, lastSaved }) => {
  const forceUpdate = useForceUpdate()

  useEffect(() => {
    const i = setInterval(forceUpdate, 5000)
    return () => {
      clearInterval(i)
    }
  })

  return (
    <SaveStateText title="Save now" onClick={onClick}>
      {isSaving ? (
        "Saving..."
      ) : (
        <>
          {isDirty ? "Some unsaved changes" : "No unsaved changes"}
          {lastSaved && (
            <Light>
              <br />
              Last saved {lastSaved.fromNow()}.
            </Light>
          )}
        </>
      )}
    </SaveStateText>
  )
}

const CreatorLayout = ({ children }) => {
  const { game, save, isSaving, isDirty, lastSaved, publish } = useContext(
    GameContext
  )

  return (
    <PageContainer>
      <Nav
        title={
          <>
            {game.name}
            <SettingsButton />
          </>
        }
        items={[
          {
            as: "a",
            href: `https://play.yourgifthunt.com/${game.creator.slug}/${
              game.slug
            }`,
            target: "_blank",
            label: "Test"
          },
          { as: "u", label: "Publish", onClick: publish }
        ]}
      >
        <SaveState
          onClick={save}
          isSaving={isSaving}
          isDirty={isDirty}
          lastSaved={lastSaved}
        />
      </Nav>
      <Main>{children}</Main>
    </PageContainer>
  )
}

export default CreatorLayout
