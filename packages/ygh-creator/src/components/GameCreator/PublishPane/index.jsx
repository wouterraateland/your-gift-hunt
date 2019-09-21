import { PRIVACY } from "data"
import React, { useCallback, useState } from "react"
import styled from "styled-components"

import useGame from "hooks/useGame"
import useEditor from "hooks/useEditor"
import useMetaActions from "hooks/useMetaActions"

import { Float, Button } from "ygh-ui"

const Container = styled.div`
  height: 100%;
  padding: 0.5rem;

  line-height: 1.5;

  background-color: #f9f9f9;
`

const SettingsModal = () => {
  const { game } = useGame()
  const { publishGame } = useMetaActions(game)
  const { setUpcomingAction, ACTION_TYPES } = useEditor()
  const [isLoading, setLoading] = useState(false)

  const onPublishClick = useCallback(async () => {
    setLoading(true)
    const published = await publishGame()
    setLoading(false)
    if (published) {
      setUpcomingAction({ type: ACTION_TYPES.SHARE_GAME })
    }
  }, [ACTION_TYPES, setUpcomingAction])

  return (
    <Container>
      <h2>Nice work, time to publish {game.name}!</h2>
      {game.privacy === PRIVACY.PUBLIC ? (
        <>
          <p>
            After publishing, you can share this game with your friends and it
            will be available for anyone to play in the showcase.
          </p>
          <Float.Right>
            <Button
              onClick={() => setUpcomingAction(null)}
              importance="tertiary"
              color="#ccc"
              disabled={isLoading}
            >
              Later
            </Button>{" "}
            <Button
              onClick={onPublishClick}
              importance="primary"
              color="primary"
              disabled={isLoading}
            >
              Publish
            </Button>
          </Float.Right>
        </>
      ) : (
        <p>
          This is a private game. To publish it, send an email to{" "}
          <a href="mailto:info@yourgifthunt.com">info@yourgifthunt.com</a> and
          we'll take care of it.
        </p>
      )}
    </Container>
  )
}

export default SettingsModal
