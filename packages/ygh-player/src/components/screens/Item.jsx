import React, { useContext } from 'react'

import GameContext from 'contexts/Game'

import Item from 'components/items'
import { Item as ItemScreen } from 'your-gift-hunt/screens'

export default ({ instanceId, ...props }) => {
  const { instances: { all } } = useContext(GameContext)
  const instance = all.find(instance => instance.id === instanceId)

  return (
    <ItemScreen
      instance={instance}
      component={() => (<Item {...instance} />)}
      {...props}
    />
  )
}
