import { useCallback, useEffect, useRef, useState } from "react"

import PanZoomContext from "contexts/PanZoom"

import { useContext } from "ygh-hooks"
import useEntityAreas from "./useEntityAreas"

const useDragOnGrid = entity => {
  const [isDragging, setDragging] = useState(false)
  const dragStart = useRef(null)
  const posStart = useRef(null)
  const wasDragging = useRef(false)
  const { zoom } = useContext(PanZoomContext, 0b100)

  const { getEntityArea, setEntityPosition } = useEntityAreas()

  const entityId = entity ? entity.id : null

  const onMouseDown = useCallback(
    event => {
      event.stopPropagation()
      dragStart.current = {
        x: event.pageX,
        y: event.pageY
      }
      wasDragging.current = false
      posStart.current = getEntityArea(entityId)
    },
    [getEntityArea, entityId]
  )

  const onWindowMouseMove = useCallback(
    event => {
      if (dragStart.current) {
        event.preventDefault()

        if (!isDragging) {
          setDragging(true)
          wasDragging.current = true
        }

        setEntityPosition(entityId, {
          top:
            posStart.current.top +
            Math.round((event.pageY - dragStart.current.y) / 32 / zoom),
          left:
            posStart.current.left +
            Math.round((event.pageX - dragStart.current.x) / 32 / zoom)
        })
      }
    },
    [isDragging, entityId, setEntityPosition]
  )

  useEffect(
    () => {
      window.addEventListener("mousemove", onWindowMouseMove)

      return () => {
        window.removeEventListener("mousemove", onWindowMouseMove)
      }
    },
    [isDragging, entityId, setEntityPosition]
  )

  const onWindowMouseUp = useCallback(() => {
    dragStart.current = null
    setDragging(false)
  }, [])

  useEffect(() => {
    window.addEventListener("mouseup", onWindowMouseUp)
    window.addEventListener("mouseleave", onWindowMouseUp)

    return () => {
      window.removeEventListener("mouseup", onWindowMouseUp)
      window.removeEventListener("mouseleave", onWindowMouseUp)
    }
  }, [])

  const onClickCapture = useCallback(event => {
    if (wasDragging.current) {
      event.stopPropagation()
      wasDragging.current = false
    }
  }, [])

  return { isDragging, onMouseDown, onClickCapture }
}

export default useDragOnGrid
