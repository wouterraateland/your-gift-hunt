import React, {
  Children,
  cloneElement,
  useCallback,
  useEffect,
  useRef
} from "react"
import styled from "styled-components"

import { useGoogleContext } from "./useGoogle"
import { useGetSet } from "ygh-hooks"

const MapInner = styled.div`
  height: 100%;
`

const Map = ({ onClick, children, ...props }) => {
  const ref = useRef(null)
  const [getMap, setMap] = useGetSet(null)
  const google = useGoogleContext()

  const handleClick = useCallback(
    event => {
      onClick(getMap(), event)
    },
    [onClick]
  )

  useEffect(() => {
    if (google) {
      setMap(
        new google.maps.Map(ref.current, {
          ...props,
          center: props.initialCenter,
          zoom: props.initialZoom
        })
      )
    }
  }, [google])

  useEffect(() => {
    const map = getMap()
    if (map) {
      const clickListener = google.maps.event.addListener(
        map,
        "click",
        handleClick
      )

      return () => {
        clickListener.remove()
      }
    }
  }, [google, handleClick])

  const childrenWithMap = Children.map(children, child =>
    cloneElement(child, { map: getMap(), google })
  )

  return <MapInner ref={ref}>{childrenWithMap}</MapInner>
}

export default Map
