import { useEffect } from 'react'
import useStore from 'hooks/useStore'

const identity = x => x
const noop = () => {}
const mean = xs => xs.reduce((acc, x) => acc + x, 0) / xs.length
const angle = (p1, p2) => Math.atan2(p2.y - p1.y, p2.x - p1.x)
const dist = (p1, p2) => Math.sqrt(Math.pow(p2.y - p1.y, 2) + Math.pow(p2.x - p1.x, 2))

const getTouches = event => event.touches
  ? [].slice.call(event.touches).map(touch => ({
      x: touch.clientX * 100 / window.innerWidth,
      y: touch.clientY * 100 / window.innerHeight,
    }))
  : [{
      x: event.clientX * 100 / window.innerWidth,
      y: event.clientY * 100 / window.innerHeight,
    }]

const draggable = ({
  onDragStart=noop,
  onDrag=noop,
  onDragEnd=noop,
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
      scale: initialScale,
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
      : identity
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

    onDragStart(event)
  }

  function handleOnDrag(event) {
    if (event.clientX === 0 && event.clientY === 0) { return }

    const touches = getTouches(event)
    const prevTouches = read('prevTouches').slice(0, touches.length)
    const nextTouches = touches.slice(0, prevTouches.length)
    const l = prevTouches.length

    const dx = l > 0
      ? mean(nextTouches.map(t => t.x)) - mean(prevTouches.map(t => t.x))
      : 0

    const dy = l > 0
      ? mean(nextTouches.map(t => t.y)) - mean(prevTouches.map(t => t.y))
      : 0

    const dr = l === 2
      ? angle(...nextTouches) - angle(...prevTouches)
      : 0

    const ds = l === 2
      ? dist(...nextTouches) / dist(...prevTouches)
      : 1

    setState({
      translation: {
        x: state.translation.x + dx,
        y: state.translation.y + dy,
      },
      rotation: state.rotation + dr,
      scale: state.scale * ds,
      prevTouches: touches,
    })

    onDrag(state)
  }

  function handleOnDragEnd(event) {
    write('prevTouches', [])
    onDragEnd(state)
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
