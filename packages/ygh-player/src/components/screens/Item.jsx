import React, { useContext } from 'react'

import GameContext from 'contexts/Game'

import { Item } from 'your-gift-hunt/screens'

export default ({ instanceId, ...props }) => {
  const { state: { all } } = useContext(GameContext)
  const instance = all.find(instance => instance.id === instanceId)

  return (
    <Item
      instance={instance}
      {...props}
    />
  )
}
