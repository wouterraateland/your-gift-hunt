import { useEffect, useRef, useState } from "react"

import useGame from "hooks/useGame"
import useInspector from "hooks/useInspector"

const INSPECTOR_WIDTH =
  25 * parseFloat(getComputedStyle(document.documentElement).fontSize)

const TRANSITION_DURATION = 200 // milliseconds

const easeInOutCubic = t =>
  (1 / 2) * ((t /= 1 / 2) < 1 ? t * t * t : (t -= 2) * t * t + 2)

const PanControls = ({ zoom, container, pan, setPan }) => {
  const [state, setState] = useState({
    t: 0,
    from: null,
    to: null
  })

  const { getNodePosition } = useGame()
  const { nodeId } = useInspector()
  const prevNodeId = useRef(null)

  useEffect(
    () => {
      if (
        container &&
        container.current &&
        nodeId &&
        nodeId !== prevNodeId.current
      ) {
        const { left, top } = getNodePosition(nodeId)
        const to = {
          x:
            (container.current.offsetWidth - INSPECTOR_WIDTH) / 2 -
            (left + 96) * zoom,
          y: container.current.offsetHeight / 2 - (top + 48) * zoom
        }

        if (to.x !== pan.x || to.y !== pan.y) {
          setState({
            t: Date.now(),
            from: pan,
            to
          })
        }
      }
      prevNodeId.current = nodeId
    },
    [pan, zoom, nodeId, container]
  )

  useEffect(
    () => {
      let r
      const u = () => {
        const t = easeInOutCubic(
          Math.min((Date.now() - state.t) / TRANSITION_DURATION, 1)
        )

        setPan({
          x: state.from.x + (state.to.x - state.from.x) * t,
          y: state.from.y + (state.to.y - state.from.y) * t
        })

        if (t < 1) {
          r = requestAnimationFrame(u)
        }
      }

      if (state.from && state.to) {
        u()
      }

      return () => {
        cancelAnimationFrame(r)
      }
    },
    [state]
  )

  return null
}

export default PanControls
