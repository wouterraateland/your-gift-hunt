import React from "react"

import useMetaActions from "hooks/useMetaActions"

import { Link } from "@reach/router"
import { Menu } from "ygh-ui"

const MoreActions = ({ game }) => {
  const { deleteGame, testGame } = useMetaActions(game)

  return (
    <Menu.Container onClick={event => event.stopPropagation()}>
      <Menu.Toggle />
      <Menu.Items>
        <Menu.Item as={Link} to={`/${game.creator.slug}/game/${game.slug}`}>
          Edit
        </Menu.Item>
        <Menu.Item onClick={testGame} onKeyPress={testGame}>
          Test
        </Menu.Item>
        <Menu.Item color="error" onClick={deleteGame} onKeyPress={deleteGame}>
          Delete
        </Menu.Item>
      </Menu.Items>
    </Menu.Container>
  )
}

export default MoreActions
