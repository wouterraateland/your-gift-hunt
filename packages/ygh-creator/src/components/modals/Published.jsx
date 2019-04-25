import React from "react"
import styled from "styled-components"

import useGame from "hooks/useGame"

import Modal from "containers/Modal"
import { Paper } from "your-gift-hunt/ui"

const StyledPaper = styled(Paper.Container)`
  width: 45em;
  max-width: calc(100% - 2em);
`

const Description = styled.p`
  max-width: 35em;
`

const SettingsModal = () => {
  const { game } = useGame()

  return (
    <Modal>
      <StyledPaper>
        <Paper.Section>
          <h1>Congrats, you published your game!</h1>
          <Description>
            Now check it out at{" "}
            <a
              href={`https://play.yourgifthunt.com/${game.creator.slug}/${
                game.slug
              }`}
              target="_blank"
              rel="noopener noreferrer"
            >
              play.yourgifthunt.com/{game.creator.slug}/{game.slug}
            </a>{" "}
            and share it with your friends 🎉
          </Description>
        </Paper.Section>
      </StyledPaper>
    </Modal>
  )
}

export default SettingsModal
