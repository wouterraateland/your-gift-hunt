import { PRIVACY, ACCESS_TYPES } from "data"
import React, { useCallback, useState } from "react"
import { navigate } from "@reach/router"
import styled from "styled-components"

import useGame from "hooks/useGame"
import useMetaActions from "hooks/useMetaActions"

import Modal from "containers/Modal"
import { Paper, Float, Button } from "ygh-ui"

const StyledPaper = styled(Paper.Container)`
  width: 45em;
  max-width: calc(100% - 2em);
`

const Description = styled.p`
  max-width: 35em;
`

const SettingsModal = () => {
  const { game } = useGame()
  const { publishGame } = useMetaActions(game)
  const [isLoading, setLoading] = useState(false)

  const onPublishClick = useCallback(async () => {
    setLoading(true)
    const published = await publishGame()
    setLoading(false)
    if (published) {
      navigate(`/${game.creator.slug}/game/${game.slug}/published`, {
        replace: true
      })
    }
  }, [])

  return (
    <Modal>
      <StyledPaper>
        <Paper.Section>
          <h1>Nice work, time to publish your game!</h1>
          {game.privacy === PRIVACY.PUBLIC ? (
            <>
              <Description>
                <strong>{game.name}</strong> is a public game. You can publish
                it for free.
              </Description>
              <Description>
                It will be available at{" "}
                <a
                  href={`https://play.yourgifthunt.com/${game.creator.slug}/${
                    game.slug
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  play.yourgifthunt.com/{game.creator.slug}/{game.slug}
                </a>{" "}
                and in{" "}
                <a
                  href="https://play.yourgifthunt.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  the showcase
                </a>{" "}
                for anyone to play!
              </Description>
            </>
          ) : (
            <>
              <Description>
                <strong>{game.name}</strong> is a private game. While Your Gift
                Hunt is in Beta, you can publish it for only 5,-.
              </Description>
              <Description>
                {game.accessType === ACCESS_TYPES.CODE ? (
                  <>
                    Your game is only playable by people with whom you share the
                    access code <strong>{game.accessCode}</strong>
                  </>
                ) : (
                  <>Your game is only playable by the following people:</>
                )}
              </Description>
              <Description>
                They can play it at{" "}
                <a
                  href={`https://play.yourgifthunt.com/${game.creator.slug}/${
                    game.slug
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  play.yourgifthunt.com/{game.creator.slug}/{game.slug}
                </a>
              </Description>
            </>
          )}

          <hr />
          <Float.Right>
            <Button
              onClick={() => window.history.back()}
              importance="tertiary"
              color="error"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={onPublishClick}
              importance="primary"
              color="primary"
              disabled={isLoading}
            >
              {game.privacy === PRIVACY.PUBLIC
                ? "Publish"
                : "Checkout and publish"}
            </Button>{" "}
          </Float.Right>
        </Paper.Section>
      </StyledPaper>
    </Modal>
  )
}

export default SettingsModal
