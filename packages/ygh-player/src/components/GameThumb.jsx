import React from "react"
import styled from "styled-components"
import _ from "ygh-utils"

import { Link } from "@reach/router"
import GamePreview from "components/GamePreview"

const Name = styled.h3`
  margin: 0.25em 0 0;
`

const RatingContainer = styled.div`
  margin: 0 0 0.5em;
`

const Rating = ({ rating }) => (
  <RatingContainer>
    {rating.toFixed(1).replace(".", ",")}{" "}
    <span role="img" aria-label="rating">
      ⭐️
    </span>
  </RatingContainer>
)

const GameThumb = ({ game }) => (
  <>
    <GamePreview
      src={game.image}
      as={Link}
      to={`/${game.creator.slug}/${game.slug}`}
      progress={game.progress}
    />
    <Name>{game.name}</Name>
    <Rating rating={_.average(game.ratings)} />
  </>
)

export default GameThumb
