import { useState, useEffect } from 'react'

const useWindowSize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  function handleOnWindowResize() {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  useEffect(() => {
    window.addEventListener('resize', handleOnWindowResize)
    return () => {
      window.removeEventListener('resize', handleOnWindowResize)
    }
  }, [])

  return size
}

export default useWindowSize
