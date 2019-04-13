import { useCallback, useContext, useState } from "react"
import DragContext from "contexts/Drag"

export const useDragProvider = () => {
  const [data, setData] = useState(null)
  const [dragElement, setDragElement] = useState(null)
  const [canDrop, setCanDrop] = useState(false)

  const drop = useCallback(() => {
    setData(null)
    setDragElement(null)
    setCanDrop(false)
  }, [])

  const disableDrop = useCallback(() => setCanDrop(false), [])
  const enableDrop = useCallback(() => setCanDrop(true), [])

  return {
    setDragElement,
    dragElement,
    setData,
    data,
    drop,
    canDrop,
    disableDrop,
    enableDrop
  }
}

const useDrag = () => useContext(DragContext)
export default useDrag
