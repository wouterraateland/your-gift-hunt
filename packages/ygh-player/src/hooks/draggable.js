import { useEffect } from 'react'
import useStore from 'hooks/useStore'

import _ from 'utils'

const getTouches = event => event.touches
  ? [].slice.call(event.touches).map(touch => ({
      x: touch.clientX,
      y: touch.clientY,
    }))
  : [{
      x: event.clientX,
      y: event.clientY,
    }]

const draggable = ({
  onDragStart=_.noop,
  onDrag=_.noop,
  onDragEnd=_.noop,
  initialTranslation={ x: 0, y: 0 },
  initialRotation=0,
  initialScale=1,
  persistent=false,
  id='',
}) => {
  const { state, setState, read, write } = useStore({
    initialState: {
      translation: initialTranslation,
      rotation: initialRotation,
      scale: Math.max(.1, initialScale),
      prevTouches: [],
    },
    enhancer: persistent
      ? state => {
          if (state) {
            const persistedState = JSON.parse(window.localStorage.getItem('draggable') || '{}')
            window.localStorage.setItem('draggable', JSON.stringify({
              ...persistedState,
              [id]: state,
            }))
          }
          return state
        }
      : _.identity
  })

  useEffect(() => {
    if (persistent) {
      const persistedState = JSON.parse(window.localStorage.getItem('draggable') || '{}')
      const initialState = persistedState[id] || {}
      setState(initialState)
    }
  }, [])

  function handleOnDragStart(event) {
    event.dataTransfer && event.dataTransfer.setDragImage(new Image(), 0, 0)

    write('prevTouches', getTouches(event))

    onDragStart(state, setState)
  }

  function handleOnDrag(event) {
    if (event.clientX === 0 && event.clientY === 0) { return }

    const touches = getTouches(event)
    const prevTouches = read('prevTouches').slice(0, touches.length)
    const nextTouches = touches.slice(0, prevTouches.length)
    const l = prevTouches.length

    const dx = l > 0
      ? _.mean(nextTouches.map(t => t.x)) - _.mean(prevTouches.map(t => t.x))
      : 0

    const dy = l > 0
      ? _.mean(nextTouches.map(t => t.y)) - _.mean(prevTouches.map(t => t.y))
      : 0

    const dr = l === 2
      ? _.angle(...nextTouches) - _.angle(...prevTouches)
      : 0

    const ds = l === 2
      ? _.dist(...nextTouches) / _.dist(...prevTouches)
      : 1

    setState({
      translation: {
        x: state.translation.x + dx,
        y: state.translation.y + dy,
      },
      rotation: state.rotation + dr,
      scale: Math.max(.1, state.scale * ds),
      prevTouches: touches,
    })

    onDrag(state, setState)
  }

  function handleOnDragEnd() {
    write('prevTouches', [])
    onDragEnd(state, setState)
  }

  return {
    setTranslation: (x, y) => write('translation', { x, y }),
    setRotation: r => write('rotation', r),
    setScale: s => write('scale', s),
    handleOnDragStart,
    handleOnDrag,
    handleOnDragEnd,
    state: {
      ...state,
      isDragging: state.prevTouches.length > 0,
    },
    handlers: {
      onDragStart:  handleOnDragStart,
      onTouchStart: handleOnDragStart,
      onDrag:       handleOnDrag,
      onTouchMove:  handleOnDrag,
      onDragEnd:    handleOnDragEnd,
      onTouchEnd:   handleOnDragEnd,
    },
  }
}

export default draggable
