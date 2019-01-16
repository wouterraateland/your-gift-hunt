import React, { useContext } from 'react'
import styled from 'styled-components'

import GameContext from 'contexts/Game'

import Screen from './Screen'
import Item from 'components/items'

const ItemContainer = styled.div`
  position: relative;
  text-align: center;

  & > h2 {
    color: #fff;
  }

  & > div {
    font-size: 6em;
  }
`

const ItemScreen = ({
  isVisible,
  instance,
  close,
}) => {
  const { dispatchAction } = useContext(GameContext)

  return (
    <Screen isVisible={isVisible} onClick={close} centerContent>
      <ItemContainer>
        <h2>{instance ? instance.name : null}</h2>
        <Item
          {...instance}
          onTransform={transformation =>
            dispatchAction({
              instanceId: instance.id,
              type: '/actions/transform',
              payload: { transformation }
            })
          }
        />
      </ItemContainer>
    </Screen>
  )
}

export default ItemScreen
