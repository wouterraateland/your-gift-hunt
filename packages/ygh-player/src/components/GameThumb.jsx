import React, { useCallback, useState } from "react"
import styled from "styled-components"

import { Link } from "@reach/router"
import { Float } from "your-gift-hunt/ui"
import { Present } from "your-gift-hunt/components"

const Container = styled.div``

const ScreenShot = styled(Link)`
  position: relative;
  overflow: hidden;

  display: block;
  padding-top: 75%;

  border-radius: ${props => props.theme.borderRadius};
  box-shadow: ${props => props.theme.boxShadow.medium};

  background: ${props => props.theme.color.primary} url(${props => props.src})
    no-repeat center / cover;
`

const StyledPresent = styled(Present)`
  position: absolute;
  left: 50%;
  top: 50%;

  max-width: 80%;
  max-height: 80%;

  transform: translate(-50%, -50%);
`

const InfoToggle = styled.div`
  cursor: pointer;

  width: 1.25em;
  padding: 0.125em;
  margin: 0.5em 0;
  border-radius: 100%;

  line-height: 1;
  text-align: center;
  font-family: ${props => props.theme.font.heading};

  box-shadow: ${props => props.theme.boxShadow.small};
  background: #0001;
`

const Description = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  overflow-x: hidden;
  overflow-y: auto;

  padding: 1em;

  background-color: #0004;
  color: #fff;
`

const Name = styled.h3`
  margin: 0.25em 0 0;
`

const Creator = styled.p`
  margin: 0 0 1.5em;
`

const GameThumb = ({ game }) => {
  const [state, setState] = useState(false)

  const onToggleClick = useCallback(() => setState(state => !state), [])

  return (
    <Container>
      <ScreenShot src={game.image} to={`/${game.creator.slug}/${game.slug}`}>
        {!game.image && <StyledPresent />}
        {state && <Description>{game.description}</Description>}
      </ScreenShot>
      <Float.Right>
        <InfoToggle onClick={onToggleClick}>i</InfoToggle>
      </Float.Right>
      <Name>{game.name}</Name>
      <Creator>
        Created by <strong>{game.creator.name}</strong>
      </Creator>
    </Container>
  )
}

export default GameThumb
