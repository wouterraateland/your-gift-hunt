import React from "react"

import useMetaActions from "hooks/useMetaActions"

import Menu from "components/Menu"

const MoreActions = ({ game }) => {
  const { deleteGame, testGame } = useMetaActions(game)

  return (
    <Menu.Container onClick={event => event.stopPropagation()}>
      <Menu.Toggle />
      <Menu>
        <Menu.Item onClick={testGame}>Test</Menu.Item>
        <Menu.Item color="error" onClick={deleteGame}>
          Delete
        </Menu.Item>
      </Menu>
    </Menu.Container>
  )
}

export default MoreActions
