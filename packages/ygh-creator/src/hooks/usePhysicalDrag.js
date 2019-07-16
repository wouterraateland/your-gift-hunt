import { useCallback, useEffect, useRef, useState } from "react"

import PanZoomContext from "contexts/PanZoomGraphic"

import { useContext } from "ygh-hooks"
import { useEntityPosition } from "./useEntityPositions"

const usePhysicalDrag = (entity, parentRotation) => {
  const [isDragging, setDragging] = useState(false)
  const prevCursor = useRef(null)
  const wasDragging = useRef(false)
  const snap = useRef(false)
  const { zoom } = useContext(PanZoomContext, 0b100)

  const [, setPosition] = useEntityPosition(entity.id)

  const onMouseDown = useCallback(event => {
    event.stopPropagation()
    prevCursor.current = {
      x: event.pageX,
      y: event.pageY
    }
    wasDragging.current = false
  }, [])

  const onWindowMouseMove = useCallback(
    event => {
      if (prevCursor.current) {
        event.preventDefault()
        const { pageX, pageY } = event

        if (!wasDragging.current) {
          setDragging(true)
          wasDragging.current = true
        }

        const parentAngle = parentRotation
          ? (parentRotation * Math.PI) / 180
          : 0
        const s = 16 * zoom
        const dx = (pageX - prevCursor.current.x) / s
        const dy = (pageY - prevCursor.current.y) / s
        const rdx = dx * Math.cos(parentAngle) + dy * Math.sin(parentAngle)
        const rdy = dy * Math.cos(parentAngle) - dx * Math.sin(parentAngle)

        setPosition(position => {
          const top = snap.current
            ? Math.round(position.top + rdy)
            : position.top + rdy
          const left = snap.current
            ? Math.round(position.left + rdx)
            : position.left + rdx

          const dt = (top - position.top) * s
          const dl = (left - position.left) * s
          prevCursor.current.y +=
            dt * Math.cos(parentAngle) + dl * Math.sin(parentAngle)
          prevCursor.current.x +=
            dl * Math.cos(parentAngle) - dt * Math.sin(parentAngle)

          return { ...position, top, left }
        })
      }
    },
    [zoom, parentRotation, setPosition]
  )

  useEffect(() => {
    window.addEventListener("mousemove", onWindowMouseMove)

    return () => {
      window.removeEventListener("mousemove", onWindowMouseMove)
    }
  }, [zoom, parentRotation, setPosition])

  const onWindowMouseUp = useCallback(() => {
    prevCursor.current = null
    setDragging(false)
  }, [])

  const onWindowKeyDown = useCallback(event => {
    if (event.key === "Shift") {
      snap.current = true
    }
  }, [])

  const onWindowKeyUp = useCallback(event => {
    if (event.key === "Shift") {
      snap.current = false
    }
  }, [])

  useEffect(() => {
    window.addEventListener("mouseup", onWindowMouseUp)
    window.addEventListener("mouseleave", onWindowMouseUp)
    window.addEventListener("keydown", onWindowKeyDown)
    window.addEventListener("keyup", onWindowKeyUp)

    return () => {
      window.removeEventListener("mouseup", onWindowMouseUp)
      window.removeEventListener("mouseleave", onWindowMouseUp)
      window.removeEventListener("keydown", onWindowKeyDown)
      window.removeEventListener("keyup", onWindowKeyUp)
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
