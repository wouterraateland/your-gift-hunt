import React from "react"
import styled from "styled-components"
import moment from "moment"
import { navigate } from "@reach/router"

import useAuth from "hooks/useAuth"

import { Edit } from "ygh-icons"

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

const Info = styled.div`
  display: inline-block;
  width: calc(100% - 22em);
  vertical-align: middle;

  @media (max-width: 45em) {
    width: calc(100% - 4em);
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

const EditTemplateSet = styled.span`
  position: relative;

  display: inline-block;
  width: 2em;
  height: 2em;
  padding: 0.25em 0.675em;
  color: ${props => props.theme.color.text};

  ${Container}:hover & {
    color: ${props => props.theme.color.emphasis};
  }
`

const Actions = ({ templateSet }) => (
  <ActionsContainer>
    <MoreActions templateSet={templateSet} />
    <EditTemplateSet>
      <Edit size={1.5} />
    </EditTemplateSet>
  </ActionsContainer>
)

const TemplateSet = ({ templateSet }) => {
  const { user } = useAuth()
  const editDate = moment(templateSet.updatedAt)
  const now = moment()
  const sameYear = editDate.year() === now.year()
  const sameDay = editDate.day() === now.day()

  return (
    <Container
      onClick={() =>
        navigate(`/${templateSet.creator.slug}/template-set/${templateSet.id}`)
      }
    >
      <Info>
        <Title>{templateSet.name}</Title>
        <small>{templateSet.description}</small>
      </Info>
      <Meta>
        <Creator>
          Created by{" "}
          {templateSet.creator.id === user.id
            ? "you"
            : templateSet.creator.name}
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
      <Actions templateSet={templateSet} />
    </Container>
  )
}

export default TemplateSet
