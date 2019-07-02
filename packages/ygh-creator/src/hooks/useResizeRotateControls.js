import { useCallback, useEffect, useRef } from "react"

import PanZoomContext from "contexts/PanZoom"

import useContext from "hooks/useContext"
import { useEntityPosition } from "./useEntityPositions"

const getCornerAngle = (corner, width, height) => {
  switch (corner) {
    case "topLeft":
      return Math.atan2(-height, -width)
    case "topRight":
      return Math.atan2(-height, width)
    case "bottomRight":
      return Math.atan2(height, width)
    case "bottomLeft":
      return Math.atan2(height, -width)
    default:
      return 0
  }
}

const useResizeControls = (entity, parentRotation) => {
  const dragStart = useRef(null)
  const posStart = useRef(null)
  const wasDragging = useRef(false)
  const dragType = useRef(null)
  const dragParams = useRef(null)
  const snap = useRef(false)
  const { zoom } = useContext(PanZoomContext, 0b100)

  const [position, setPosition] = useEntityPosition(entity.id)

  const start = useCallback(
    (type, params) => event => {
      event.stopPropagation()
      dragStart.current = {
        x: event.pageX,
        y: event.pageY
      }
      wasDragging.current = false
      posStart.current = {
        ...position,
        rotation: parentRotation
      }
      dragType.current = type
      dragParams.current = params
    },
    [position, parentRotation]
  )

  const onWindowMouseMove = useCallback(
    event => {
      if (dragStart.current) {
        event.preventDefault()

        wasDragging.current = true

        const visibleWidth = posStart.current.width * 16 * zoom
        const visibleHeight = posStart.current.height * 16 * zoom
        const currentAngle = (posStart.current.rotation * Math.PI) / 180
        let width = posStart.current.width
        let height = posStart.current.height

        if (dragType.current === "resize") {
          if (dragParams.current.x !== 0) {
            width =
              (visibleWidth +
                dragParams.current.x *
                  (Math.cos(currentAngle) *
                    (event.pageX - dragStart.current.x) +
                    Math.sin(currentAngle) *
                      (event.pageY - dragStart.current.y))) /
              (16 * zoom)
          }
          if (dragParams.current.y !== 0) {
            height =
              (visibleHeight +
                dragParams.current.y *
                  (Math.cos(currentAngle) *
                    (event.pageY - dragStart.current.y) -
                    Math.sin(currentAngle) *
                      (event.pageX - dragStart.current.x))) /
              (16 * zoom)
          }

          setPosition({
            width: snap.current ? Math.round(width) : width,
            height: snap.current ? Math.round(height) : height
          })
        } else {
          const cornerAngle = getCornerAngle(
            dragParams.current,
            visibleWidth,
            visibleHeight
          )
          const initialAngle = cornerAngle + currentAngle
          const diagonal = Math.sqrt(
            Math.pow(visibleWidth, 2) + Math.pow(visibleHeight, 2)
          )

          const centerX =
            dragStart.current.x - (diagonal / 2) * Math.cos(initialAngle)
          const centerY =
            dragStart.current.y - (diagonal / 2) * Math.sin(initialAngle)

          const rotation =
            (360 +
              ((currentAngle +
                Math.atan2(event.pageY - centerY, event.pageX - centerX) -
                Math.atan2(
                  dragStart.current.y - centerY,
                  dragStart.current.x - centerX
                )) *
                180) /
                Math.PI) %
            360

          setPosition({
            rotation: snap.current ? Math.round(rotation / 15) * 15 : rotation
          })
        }
      }
    },
    [setPosition, parentRotation]
  )

  useEffect(() => {
    window.addEventListener("mousemove", onWindowMouseMove)

    return () => {
      window.removeEventListener("mousemove", onWindowMouseMove)
    }
  }, [setPosition, parentRotation])

  const onWindowMouseUp = useCallback(event => {
    if (wasDragging.current) {
      event.stopPropagation()
      wasDragging.current = false
    }
    dragStart.current = null
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
    window.addEventListener("mouseup", onWindowMouseUp, { capture: true })
    window.addEventListener("mouseleave", onWindowMouseUp)
    window.addEventListener("keydown", onWindowKeyDown)
    window.addEventListener("keyup", onWindowKeyUp)

    return () => {
      window.removeEventListener("mouseup", onWindowMouseUp, { capture: true })
      window.removeEventListener("mouseleave", onWindowMouseUp)
      window.removeEventListener("keydown", onWindowKeyDown)
      window.removeEventListener("keyup", onWindowKeyUp)
    }
  }, [])

  return {
    resizeHandlers: {
      top: { onMouseDown: start("resize", { x: 0, y: -1 }) },
      right: { onMouseDown: start("resize", { x: 1, y: 0 }) },
      bottom: {
        onMouseDown: start("resize", { x: 0, y: 1 })
      },
      left: { onMouseDown: start("resize", { x: -1, y: 0 }) }
    },
    rotateHandlers: {
      topLeft: { onMouseDown: start("rotate", "topLeft") },
      topRight: { onMouseDown: start("rotate", "topRight") },
      bottomRight: {
        onMouseDown: start("rotate", "bottomRight")
      },
      bottomLeft: {
        onMouseDown: start("rotate", "bottomLeft")
      }
    }
  }
}

export default useResizeControls
