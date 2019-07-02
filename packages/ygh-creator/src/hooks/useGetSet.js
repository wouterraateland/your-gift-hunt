import { useRef } from "react"

const useGetSet = initialValue => {
  const ref = useRef(initialValue)
  const get = () => ref.current
  const set = value => {
    if (typeof value === "function") {
      ref.current = value(ref.current)
    } else {
      ref.current = value
    }
    return ref.current
  }

  return [get, set]
}

export default useGetSet
