import React, { useContext } from 'react'
import styled from 'styled-components'

import ScreenContext from 'contexts/Screen'

import Item from 'your-gift-hunt/items'
import ItemScreen from 'components/screens/Item'

import DragContainer from 'components/DragContainer'

const InventoryContainer = styled.div`
  position: fixed;
  left: 0;
  bottom: 0; right: 0;
  z-index: 4;

  height: 7em;
  padding: .5em;

  white-space: nowrap;

  background: #0009;
`

const ItemSlot = styled.div`
  display: inline-block;
  width: 3em;
  height: 3em;
  padding: .5em;
  margin: 0 .25em;
  border-radius: 1em;
  font-size: 1.5em;

  background: #0009;
`

const Inventory = ({ items }) => {
  const { popup } = useContext(ScreenContext)

  return (
    <InventoryContainer>
      {items.map(item => (
        <ItemSlot
          key={item.id}
          onClick={() => popup(ItemScreen, { instanceId: item.id })}
        >
          <DragContainer data={item}>
            <Item {...item} />
          </DragContainer>
        </ItemSlot>
      ))}
    </InventoryContainer>
  )
}

export default Inventory
