import { useCallback, useEffect, useRef, useState } from "react"

import PanZoomContext from "contexts/PanZoom"

import useContext from "hooks/useContext"
import { useEntityPosition } from "./useEntityPositions"

const useResizeControls = entity => {
  const [isDragging, setDragging] = useState(false)
  const dragStart = useRef(null)
  const posStart = useRef(null)
  const wasDragging = useRef(false)
  const dragType = useRef(null)
  const dragParams = useRef(null)
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
      posStart.current = position
      dragType.current = type
      dragParams.current = params
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

        const visibleWidth = posStart.current.width * 16 * zoom
        const visibleHeight = posStart.current.height * 16 * zoom
        const currentAngle = (posStart.current.rotation * Math.PI) / 180

        if (dragType.current === "resize") {
          const scale =
            Math.abs(
              (dragParams.current.x *
                (visibleWidth +
                  (Math.cos(currentAngle) *
                    (event.pageX - dragStart.current.x) +
                    Math.sin(currentAngle) *
                      (event.pageY - dragStart.current.y)) *
                    dragParams.current.x)) /
                visibleWidth
            ) +
            Math.abs(
              (dragParams.current.y *
                (visibleHeight +
                  (Math.cos(currentAngle) *
                    (event.pageY - dragStart.current.y) -
                    Math.sin(currentAngle) *
                      (event.pageX - dragStart.current.x)) *
                    dragParams.current.y)) /
                visibleHeight
            )

          setPosition({
            height: posStart.current.height * scale,
            width: posStart.current.width * scale
          })
        } else {
          const initialAngle =
            ((posStart.current.rotation + dragParams.current) * Math.PI) / 180
          const center = {
            x:
              dragStart.current.x - (visibleWidth / 2) * Math.cos(initialAngle),
            y:
              dragStart.current.y - (visibleHeight / 2) * Math.sin(initialAngle)
          }
          const currentAngle = Math.atan2(
            event.pageY - center.y,
            event.pageX - center.x
          )
          setPosition({
            rotation:
              (360 +
                posStart.current.rotation +
                ((currentAngle - initialAngle) * 180) / Math.PI -
                initialAngle) %
              360
          })
        }
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

  return {
    resizeHandlers: {
      top: { onMouseDown: start("resize", { x: 0, y: -1 }), onClickCapture },
      right: { onMouseDown: start("resize", { x: 1, y: 0 }), onClickCapture },
      bottom: { onMouseDown: start("resize", { x: 0, y: 1 }), onClickCapture },
      left: { onMouseDown: start("resize", { x: -1, y: 0 }), onClickCapture }
    },
    rotateHandlers: {
      topLeft: { onMouseDown: start("rotate", 225), onClickCapture },
      topRight: { onMouseDown: start("rotate", 315), onClickCapture },
      bottomRight: { onMouseDown: start("rotate", 45), onClickCapture },
      bottomLeft: { onMouseDown: start("rotate", 135), onClickCapture }
    }
  }
}

export default useResizeControls
