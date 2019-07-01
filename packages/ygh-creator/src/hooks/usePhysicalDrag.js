import { useCallback, useEffect, useRef, useState } from "react"

import PanZoomContext from "contexts/PanZoom"

import useContext from "hooks/useContext"
import { useEntityPosition } from "./useEntityPositions"

const usePhysicalDrag = (entity, parentRotation) => {
  const [isDragging, setDragging] = useState(false)
  const dragStart = useRef(null)
  const posStart = useRef(null)
  const wasDragging = useRef(false)
  const snap = useRef(false)
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

        const parentAngle = parentRotation
          ? (parentRotation * Math.PI) / 180
          : 0
        const dx = event.pageX - dragStart.current.x
        const dy = event.pageY - dragStart.current.y
        const rdx = dx * Math.cos(parentAngle) + dy * Math.sin(parentAngle)
        const rdy = dy * Math.cos(parentAngle) - dx * Math.sin(parentAngle)

        const top = posStart.current.top + rdy / 16 / zoom
        const left = posStart.current.left + rdx / 16 / zoom

        setPosition({
          top: snap.current ? Math.round(top) : top,
          left: snap.current ? Math.round(left) : left
        })
      }
    },
    [parentRotation, isDragging, setPosition]
  )

  useEffect(() => {
    window.addEventListener("mousemove", onWindowMouseMove)

    return () => {
      window.removeEventListener("mousemove", onWindowMouseMove)
    }
  }, [parentRotation, isDragging, setPosition])

  const onWindowMouseUp = useCallback(() => {
    dragStart.current = null
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
