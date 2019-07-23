import { useContext, useEffect, useRef, useState } from "react"

import GoogleContext from "./GoogleContext"

const GOOGLE_MAPS_API_URL = "https://maps.googleapis.com/maps/api/js"

const useGoogle = ({ apiKey }) => {
  const shouldLoad = useRef(true)
  const [google, setGoogle] = useState(null)

  const load = async () => {
    if (document) {
      const existingScript = document.querySelector(
        `[src^="${GOOGLE_MAPS_API_URL}"]`
      )
      if (existingScript) {
        return setGoogle(window.google)
      }

      const script = document.createElement("script")
      script.addEventListener("load", () => {
        if (shouldLoad.current) {
          setGoogle(window.google)
        }
      })
      script.src = `${GOOGLE_MAPS_API_URL}?key=${apiKey}`
      document.body.appendChild(script)
    }
  }

  useEffect(() => {
    load()
    return () => {
      shouldLoad.current = false
    }
  }, [])

  return google
}
export default useGoogle

export const useGoogleContext = () => useContext(GoogleContext)
