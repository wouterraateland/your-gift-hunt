import React, { useState } from 'react'
import styled from 'styled-components'

import Item from 'components/items'
import ItemScreen from 'components/screens/Item'

const InventoryContainer = styled.div`
  position: fixed;
  left: 0;
  bottom: 0; right: 0;

  overflow-x: auto;

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
  const [selectedItem, selectItem] = useState(null)

  return (
    <>
      <InventoryContainer>
        {items.map(item => (
          <ItemSlot
            key={item.id}
            onClick={() => selectItem(selectedItem === item ? null : item)}
          >
            <Item {...item} />
          </ItemSlot>
        ))}
      </InventoryContainer>
      <ItemScreen
        isVisible={selectedItem !== null}
        entity={selectedItem}
        close={() => selectItem(null)}
      />
    </>
  )
}

export default Inventory
