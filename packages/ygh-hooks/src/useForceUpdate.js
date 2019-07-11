import { useState } from "react"

const useForceUpdate = () => {
  const [, setState] = useState(false)
  const forceUpdate = () => setState(state => !state)

  return forceUpdate
}

export default useForceUpdate
