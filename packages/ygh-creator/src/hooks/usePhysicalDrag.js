import { useCallback, useEffect, useRef, useState } from "react"

import PanZoomContext from "contexts/PanZoom"

import useContext from "hooks/useContext"
import { useEntityPosition } from "./useEntityPositions"

const usePhysicalDrag = entity => {
  const [isDragging, setDragging] = useState(false)
  const dragStart = useRef(null)
  const posStart = useRef(null)
  const wasDragging = useRef(false)
  const { zoom } = useContext(PanZoomContext, 0b100)

  const [position, setPosition] = useEntityPosition(entity.id)

  const onMouseDown = useCallback(
    event => {
      event.stopPropagation()
      dragStart.current = {
        x: event.pageX,
        y: event.pageY
      }
      wasDragging.current = false
      posStart.current = position
    },
    [position]
  )

  const onWindowMouseMove = useCallback(
    event => {
      if (dragStart.current) {
        event.preventDefault()

        if (!isDragging) {
          setDragging(true)
          wasDragging.current = true
        }

        setPosition({
          top:
            posStart.current.top +
            (event.pageY - dragStart.current.y) / 16 / zoom,
          left:
            posStart.current.left +
            (event.pageX - dragStart.current.x) / 16 / zoom
        })
      }
    },
    [isDragging, setPosition]
  )

  useEffect(
    () => {
      window.addEventListener("mousemove", onWindowMouseMove)

      return () => {
        window.removeEventListener("mousemove", onWindowMouseMove)
      }
    },
    [isDragging, setPosition]
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

export default usePhysicalDrag
