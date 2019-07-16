import { useCallback, useEffect, useRef } from "react"
import { useGetSet, useForceUpdate } from "ygh-hooks"

const clamp = (min, max) => value => Math.max(min, Math.min(value, max))
const identity = x => x
const noop = () => {}
const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))
const maybe = (f, g) => v => (v === null || v === undefined ? f() : g(v))
const snd = g => ([x, y]) => [x, g(y)]
const toPair = v => [v, v]

const getOffset = maybe(
  () => ({ left: 0, top: 0 }),
  compose(
    ([el, { left, top }]) => ({
      left: left + el.offsetLeft,
      top: top + el.offsetTop
    }),
    snd(el => getOffset(el.offsetParent)),
    toPair
  )
)

const getPositionOnElement = compose(
  ({ left, top }) => (x, y) => ({
    x: x - left,
    y: y - top
  }),
  getOffset
)

const usePanZoom = ({
  enablePan = true,
  enableZoom = true,
  requirePinch = false,
  panOnDrag = false,
  preventClickOnPan = true,
  zoomSensitivity = 0.01,
  minZoom = 0,
  maxZoom = Infinity,
  minX = -Infinity,
  maxX = Infinity,
  minY = -Infinity,
  maxY = Infinity,
  initialZoom = 1,
  initialPan = { x: 0, y: 0 },
  onPanStart = noop,
  onPan = noop,
  onPanEnd = noop,
  onZoom = noop
}) => {
  const container = useRef(null)
  const forceUpdate = useForceUpdate()
  const wasPanning = useRef(false)
  const prev = useRef([])
  const prevZoom = useRef(1)
  const [getCenter, setCenter] = useGetSet({ top: 0, left: 0 })

  const [isPanning, setPanning] = useGetSet(false)
  const [getTransform, _setTransform] = useGetSet({
    ...initialPan,
    zoom: initialZoom
  })

  const clampX = useCallback(clamp(minX, maxX), [minX, maxX])
  const clampY = useCallback(clamp(minY, maxY), [minY, maxY])
  const clampZoom = useCallback(clamp(minZoom, maxZoom), [minZoom, maxZoom])

  const setTransform = useCallback(v => {
    const r = _setTransform(v)
    const { x, y, zoom } = getTransform()
    setCenter({
      top: (container.current.offsetHeight / 2 - y) / zoom,
      left: (container.current.offsetWidth / 2 - x) / zoom
    })
    forceUpdate()
    return r
  }, [])

  const setPan = useCallback(
    f =>
      setTransform(({ x, y, zoom }) => {
        const newPan = typeof f === "function" ? f({ x, y }) : f

        return {
          x: clampX(newPan.x),
          y: clampY(newPan.y),
          zoom
        }
      }),
    [minX, maxX, minY, maxY]
  )

  const setZoom = useCallback(
    (f, maybeCenter) =>
      setTransform(({ x, y, zoom }) => {
        const newZoom = clampZoom(typeof f === "function" ? f(zoom) : f)

        const center = maybe(
          () => ({
            x: container.current.offsetWidth / 2,
            y: container.current.offsetHeight / 2
          }),
          identity
        )(maybeCenter)

        return {
          x: clampX(x + ((center.x - x) * (zoom - newZoom)) / zoom),
          y: clampY(y + ((center.y - y) * (zoom - newZoom)) / zoom),
          zoom: newZoom
        }
      }),
    [minX, maxX, minY, maxY, minZoom, maxZoom]
  )

  const startPanZoom = useCallback(
    pointers => {
      if (enablePan) {
        prev.current = pointers

        setPanning(true)

        onPanStart(pointers)
      }
    },
    [enablePan, onPanStart]
  )

  const movePanZoom = useCallback(
    pointers => {
      if (isPanning()) {
        wasPanning.current = true

        const prevPointers = prev.current
        prev.current = pointers

        setPan(({ x, y }) => {
          let dx = 0,
            dy = 0,
            l = Math.min(pointers.length, prevPointers.length)

          for (let i = 0; i < l; i++) {
            dx += pointers[i].x - prevPointers[i].x
            dy += pointers[i].y - prevPointers[i].y
          }

          return {
            x: x + dx / l,
            y: y + dy / l
          }
        })

        onPan(pointers)
      }
    },
    [onPan, minX, maxX, minY, maxY]
  )

  const endPanZoom = useCallback(() => {
    if (isPanning()) {
      setPanning(false)
      onPanEnd()
    }
  }, [onPanEnd])

  const onClickCapture = useCallback(
    event => {
      if ((preventClickOnPan, wasPanning.current)) {
        wasPanning.current = false
        event.stopPropagation()
      }
    },
    [preventClickOnPan]
  )

  const onWheel = useCallback(
    event => {
      event.preventDefault()

      if (enableZoom && container.current) {
        if (!requirePinch || event.ctrlKey) {
          const { pageX, pageY, deltaY } = event
          const pointerPosition = getPositionOnElement(container.current)(
            pageX,
            pageY
          )

          setZoom(
            zoom => zoom * Math.pow(1 - zoomSensitivity, deltaY),
            pointerPosition
          )

          onZoom()
        } else {
          const { deltaX, deltaY } = event
          setPan(({ x, y }) => ({
            x: x - deltaX,
            y: y - deltaY
          }))
        }
      }
    },
    [enableZoom, requirePinch, onZoom, minX, maxX, minY, maxY, minZoom, maxZoom]
  )

  const onGestureStart = useCallback(event => {
    event.preventDefault()
    prevZoom.current = getTransform().zoom
  }, [])

  const onGesture = useCallback(event => {
    event.preventDefault()

    const { pageX, pageY, scale } = event
    const pointerPosition = getPositionOnElement(container.current)(
      pageX,
      pageY
    )

    setZoom(prevZoom.current * scale, pointerPosition)

    onZoom()
  }, [])

  const setContainer = useCallback(el => {
    if (el) {
      el.addEventListener("wheel", onWheel)
      el.addEventListener("gesturestart", onGestureStart)
      el.addEventListener("gesturechange", onGesture)
      el.addEventListener("gestureend", onGesture)
    } else if (container.current) {
      return () => {
        container.current.removeEventListener("wheel", onWheel)
        container.current.removeEventListener("gesturestart", onGestureStart)
        container.current.removeEventListener("gesturechange", onGesture)
        container.current.removeEventListener("gestureend", onGesture)
      }
    }
    container.current = el
  }, [])

  useEffect(() => {
    if (container.current) {
      container.current.addEventListener("wheel", onWheel)
      container.current.addEventListener("gesturestart", onGestureStart)
      container.current.addEventListener("gesturechange", onGesture)
      container.current.addEventListener("gestureend", onGesture)
      return () => {
        container.current.removeEventListener("wheel", onWheel)
        container.current.removeEventListener("gesturestart", onGestureStart)
        container.current.removeEventListener("gesturechange", onGesture)
        container.current.removeEventListener("gestureend", onGesture)
      }
    }
  }, [])

  const onTouchStart = ({ touches }) =>
    startPanZoom(
      [...touches].map(({ pageX, pageY }) => ({ x: pageX, y: pageY }))
    )
  const onTouchMove = ({ touches }) =>
    movePanZoom(
      [...touches].map(({ pageX, pageY }) => ({ x: pageX, y: pageY }))
    )
  const onTouchEnd = () => endPanZoom()
  const onTouchCancel = () => endPanZoom()
  const onMouseDown = ({ pageX, pageY }) =>
    startPanZoom([{ x: pageX, y: pageY }])
  const onMouseMove = ({ pageX, pageY }) =>
    movePanZoom([{ x: pageX, y: pageY }])
  const onMouseUp = () => endPanZoom()
  const onMouseLeave = () => endPanZoom()

  const transform = getTransform()
  return {
    container,
    setContainer,
    transform: `translate3D(${transform.x}px, ${transform.y}px, 0) scale(${
      transform.zoom
    })`,
    center: getCenter(),
    pan: { x: transform.x, y: transform.y },
    zoom: transform.zoom,
    setPan,
    setZoom,
    panZoomHandlers: panOnDrag
      ? {
          onTouchStart,
          onTouchMove,
          onTouchEnd,
          onTouchCancel,
          onMouseDown,
          onMouseMove,
          onMouseUp,
          onClickCapture,
          onMouseLeave
        }
      : {}
  }
}

export default usePanZoom
