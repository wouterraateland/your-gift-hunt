import { useState } from "react"

const getOffset = el => {
  if (el) {
    const { left, top } = getOffset(el.offsetParent)
    return { left: left + el.offsetLeft, top: top + el.offsetTop }
  } else {
    return { left: 0, top: 0 }
  }
}

function getPointer(pageX, pageY, el) {
  const { left, top } = getOffset(el)
  return {
    x: pageX - left,
    y: pageY - top
  }
}

const usePanning = ({ container, zoom, minZoom, maxZoom }) => {
  const [isDragging, setDragging] = useState(false)
  const [transform, setTransform] = useState({ x: 0, y: 0, s: 1 })
  const [prev, setPrev] = useState({ x: 0, y: 0 })

  function onMouseDown(event) {
    setDragging(true)
    setPrev({ x: event.pageX, y: event.pageY })

    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()
    event.preventDefault()
  }

  function onMouseMove(event) {
    const { pageX, pageY } = event
    if (isDragging) {
      setTransform(({ x, y, s }) => ({
        x: x + pageX - prev.x,
        y: y + pageY - prev.y,
        s
      }))
    }
    setPrev({ x: pageX, y: pageY })
  }

  function onMouseUp() {
    setDragging(false)
  }

  function onWheel(event) {
    event.preventDefault()
    if (zoom && container.current) {
      const { pageX, pageY, deltaY } = event
      setTransform(({ x, y, s }) => {
        const pointerPosition = getPointer(pageX, pageY, container.current)
        const newS = Math.max(
          minZoom,
          Math.min(s * Math.pow(0.99, deltaY), maxZoom)
        )

        return {
          x: x + ((pointerPosition.x - x) * (s - newS)) / s,
          y: y + ((pointerPosition.y - y) * (s - newS)) / s,
          s: newS
        }
      })
    }
  }

  return {
    transform,
    translation: { x: transform.x, y: transform.y },
    scale: transform.s,
    panHandlers: {
      onMouseDown,
      onMouseMove,
      onMouseUp,
      onWheel
    }
  }
}

export default usePanning
