import React, { useContext } from "react"
import styled from "styled-components"
import moment from "moment"
import { Link } from "@reach/router"

import AuthContext from "contexts/Auth"

import { Edit } from "your-gift-hunt/icons"
import MoreActions from "./MoreActions"

const StyledHuntThumb = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1em;

  &:nth-child(2n) {
    background-color: #0001;
  }
`

const HuntTitle = styled.h2`
  width: 50%;
  margin: 0;
`

const HuntMeta = styled.p`
  margin: 0;
`

const EditProject = styled(Link)`
  position: relative;
  width: 2em;
  height: 2em;
  padding: 0.25em 0.675em;
`

const StyledHuntThumbActions = styled.div`
  display: flex;
`

const HuntThumbActions = ({ game }) => (
  <StyledHuntThumbActions>
    <MoreActions game={game} />
    <EditProject to={`/${game.creator.slug}/${game.slug}`}>
      <Edit size={1.5} />
    </EditProject>
  </StyledHuntThumbActions>
)

const HuntThumb = ({ game }) => {
  const { user } = useContext(AuthContext)
  const { name, updatedAt, creator } = game

  return (
    <StyledHuntThumb>
      <HuntTitle>{name}</HuntTitle>
      <HuntMeta>
        <strong>
          Created by{" "}
          {creator.id === user.user_metadata.prismaUserId
            ? "you"
            : creator.name}
        </strong>
        <br />
        Last edited {moment(updatedAt).fromNow()}
      </HuntMeta>
      <HuntThumbActions game={game} />
    </StyledHuntThumb>
  )
}

export default HuntThumb
