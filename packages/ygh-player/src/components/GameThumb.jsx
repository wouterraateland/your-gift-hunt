import React from "react"
import styled from "styled-components"

import { Link } from "@reach/router"
import GamePreview from "components/GamePreview"

const Name = styled.h3`
  margin: 0.25em 0 0;
`

const GameThumb = ({ game }) => (
  <>
    <GamePreview
      src={game.image}
      as={Link}
      to={`/${game.creator.slug}/${game.slug}`}
      progress={game.progress}
    />
    <Name>{game.name}</Name>
  </>
)

export default GameThumb
