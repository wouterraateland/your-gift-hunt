import React from "react"
import styled from "styled-components"
import moment from "moment"
import { navigate } from "@reach/router"

import useAuth from "hooks/useAuth"

import Icons from "ygh-icons"

import MoreActions from "./MoreActions"

const Container = styled.div`
  cursor: pointer;

  padding: 0.5em 1em;

  &:nth-child(2n + 1) {
    background-color: #00000009;
  }

  &:hover {
    background: #0001;
  }
`

const StyledPresent = styled(Icons.Present)`
  position: absolute;
  left: 50%;
  top: 50%;

  max-width: 80%;
  max-height: 80%;

  transform: translate(-50%, -50%);
`

const Preview = styled.div`
  position: relative;

  display: inline-block;
  width: calc(16em / 3);
  height: calc(9em / 3);
  margin-right: 1em;
  border-radius: ${props => props.theme.borderRadius};

  background: #0002 url(${props => props.src}) no-repeat center / cover;
`

const Info = styled.div`
  display: inline-block;
  width: calc(100% - 28.5em);
  vertical-align: middle;

  @media (max-width: 45em) {
    width: calc(100% - 10.5em);
  }
`

const Meta = styled.div`
  display: inline-block;
  width: 18em;

  @media (max-width: 45em) {
    display: none;
  }
`

const Title = styled.h2`
  margin: 0;
`

const Creator = styled.strong`
  display: block;
  margin: 0.7em 0 0.1em;
`

const ActionsContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`

const EditProject = styled.span`
  position: relative;

  display: inline-block;
  padding: 0.25em;

  color: ${props => props.theme.color.text};

  ${Container}:hover & {
    color: ${props => props.theme.color.emphasis};
  }
`

const Actions = ({ game }) => (
  <ActionsContainer>
    <MoreActions game={game} />
    <EditProject>
      <Icons.Caret direction="right" size={1.5} />
    </EditProject>
  </ActionsContainer>
)

const Game = ({ game }) => {
  const { user } = useAuth()
  const editDate = moment(game.updatedAt)
  const now = moment()
  const sameYear = editDate.year() === now.year()
  const sameDay = editDate.day() === now.day()
  const playCount = game.plays.filter(({ isTest }) => !isTest).length

  return (
    <Container onClick={() => navigate(`/edit/${game.id}`)}>
      {game.image ? (
        <Preview src={game.image} />
      ) : (
        <Preview>
          <StyledPresent />
        </Preview>
      )}
      <Info>
        <Title>{game.name}</Title>
        <small>
          {game.privacy === "PRIVATE" ? "Private" : "Public"} game
          {" • "}
          {game.publishedAt ? (
            `Played ${playCount} time${playCount === 1 ? "" : `s`}`
          ) : (
            <em>Not published yet</em>
          )}
        </small>
      </Info>
      <Meta>
        <Creator>
          Created by {game.creator.id === user.id ? "you" : game.creator.name}
        </Creator>
        <small>
          Last edited{" "}
          {sameDay
            ? editDate.fromNow()
            : `on ${editDate.format(
                sameYear ? "MMM DD" : "MMM DD, YYYY"
              )} (${editDate.fromNow()})`}
        </small>
      </Meta>
      <Actions game={game} />
    </Container>
  )
}

export default Game
