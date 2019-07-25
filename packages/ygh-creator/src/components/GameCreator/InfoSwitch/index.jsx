import React from "react"
import styled, { css } from "styled-components"

import useEditor from "hooks/useEditor"

import Icons from "ygh-icons"
import { ToolTip } from "ygh-ui"

const Container = styled.div`
  flex-shrink: 0;

  width: 3em;
  height: 100%;
  border-right: 1px solid #0002;

  background-color: #fcfcfc;
`

const Switch = styled.div`
  padding: 0.5em;
  color: ${props => props.theme.color.text};

  &:hover {
    color: ${props => props.theme.color.primary};
  }

  ${props =>
    props.isSelected &&
    css`
      color: ${props.theme.color.primary};
    `}
`

const InfoSwitch = () => {
  const { selectedTab, selectTab, INFO_TYPES } = useEditor()

  return (
    <Container>
      <Switch
        isSelected={selectedTab === INFO_TYPES.INFO}
        onClick={() =>
          selectTab(selectedTab =>
            selectedTab === INFO_TYPES.INFO ? null : INFO_TYPES.INFO
          )
        }
      >
        <Icons.Cog size={2} />
        <ToolTip direction="horizontal">Game info</ToolTip>
      </Switch>
      <Switch
        isSelected={selectedTab === INFO_TYPES.EXPLORE}
        onClick={() =>
          selectTab(selectedTab =>
            selectedTab === INFO_TYPES.EXPLORE ? null : INFO_TYPES.EXPLORE
          )
        }
      >
        <Icons.Cube size={2} />
        <ToolTip direction="horizontal">Explorer</ToolTip>
      </Switch>
      <Switch
        isSelected={selectedTab === INFO_TYPES.NEW_ENTITY}
        onClick={() =>
          selectTab(selectedTab =>
            selectedTab === INFO_TYPES.NEW_ENTITY ? null : INFO_TYPES.NEW_ENTITY
          )
        }
      >
        <Icons.Plus size={2} />
        <ToolTip direction="horizontal">New entity</ToolTip>
      </Switch>
    </Container>
  )
}

export default InfoSwitch
