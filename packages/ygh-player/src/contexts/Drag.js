import React, { useState, createContext } from 'react'

const DragContext = createContext({})

export const DragProvider = ({ children }) => {
  const [data, setData] = useState(null)
  const [dragElement, setDragElement] = useState(null)
  const [canDrop, setCanDrop] = useState(false)

  function drop() {
    setData(null)
    setDragElement(null)
    setCanDrop(false)
  }

  const value = {
    setDragElement,
    dragElement,
    setData,
    data,
    drop,
    canDrop,
    disableDrop: () => setCanDrop(false),
    enableDrop: () => setCanDrop(true),
  }

  return (
    <DragContext.Provider
      value={value}
    >
      {children}
    </DragContext.Provider>
  )
}

export default DragContext
