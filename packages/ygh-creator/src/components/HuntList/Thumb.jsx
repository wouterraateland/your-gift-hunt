import React, { useContext } from "react"
import styled from "styled-components"
import moment from "moment"
import { navigate } from "@reach/router"

import AuthContext from "contexts/Auth"

import { Edit } from "your-gift-hunt/icons"
import { Present } from "your-gift-hunt/components"

import MoreActions from "./MoreActions"

const StyledThumb = styled.div`
  cursor: pointer;

  padding: 0.5em 1em;

  &:nth-child(2n + 1) {
    background-color: #00000009;
  }

  &:hover {
    background: #0001;
  }
`

const StyledPresent = styled(Present)`
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
  width: calc(100% - 25.5em);
  vertical-align: middle;

  @media (max-width: 45em) {
    width: calc(100% - 10.5em);
  }
`

const Meta = styled.div`
  display: inline-block;
  width: 15em;

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
  width: 2em;
  height: 2em;
  padding: 0.25em 0.675em;
`

const Actions = ({ game }) => (
  <ActionsContainer>
    <MoreActions game={game} />
    <EditProject>
      <Edit size={1.5} />
    </EditProject>
  </ActionsContainer>
)

const Thumb = ({ game }) => {
  const { user } = useContext(AuthContext)
  const editDate = moment(game.updatedAt)
  const now = moment()
  const sameYear = editDate.year() === now.year()
  const playCount = game.plays.length

  return (
    <StyledThumb onClick={() => navigate(`/${game.creator.slug}/${game.slug}`)}>
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
          {game.privacy === "PRIVATE" ? "Private" : "Public"} hunt
          {" • "}
          Played {playCount} time{playCount === 1 ? "" : `s`}
        </small>
      </Info>
      <Meta>
        <Creator>
          Created by{" "}
          {game.creator.id === user.user_metadata.prismaUserId
            ? "you"
            : game.creator.name}
        </Creator>
        <small>
          Last edited on {editDate.format(sameYear ? "MMM DD" : "MMM DD, YYYY")}{" "}
          ({editDate.fromNow()})
        </small>
      </Meta>
      <Actions game={game} />
    </StyledThumb>
  )
}

export default Thumb
