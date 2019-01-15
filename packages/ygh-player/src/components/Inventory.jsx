import React from 'react'
import styled from 'styled-components'

import Item from 'components/items'

const InventoryContainer = styled.div`
  position: fixed;
  left: 0;
  bottom: 0; right: 0;

  overflow-x: auto;

  height: 7em;

  white-space: nowrap;

  background: #0009;
`

const ItemSlot = styled.div`
  display: inline-block;
  width: 3em;
  height: 3em;
  padding: .5em;
  margin: .5em;
  border-radius: 1em;
  font-size: 1.5em;

  background: #0009;
`

const Inventory = ({ items }) => {
  items.push({ id: '1234', item: '/entities/watering-can', state: 'empty' })

  return (
    <InventoryContainer>
      {items.map(item => (
        <ItemSlot key={item.id}>
          <Item item={item.item} state={item.state} />
        </ItemSlot>
      ))}
    </InventoryContainer>
  )
}

export default Inventory
