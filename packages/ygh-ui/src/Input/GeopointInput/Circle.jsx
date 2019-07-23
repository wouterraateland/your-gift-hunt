import { useEffect } from "react"
import { useGetSet } from "ygh-hooks"

const Circle = ({ map, google, ...props }) => {
  const [getCircle, setCircle] = useGetSet()

  useEffect(() => {
    setCircle(new google.maps.Circle(props))

    return () => {
      setCircle(null)
    }
  }, [google])

  useEffect(() => {
    const circle = getCircle()
    if (circle) {
      circle.setMap(map)

      return () => {
        circle.setMap(null)
      }
    }
  }, [map])

  useEffect(() => {
    const circle = getCircle()
    if (circle) {
      circle.setOptions(props)
    }
  }, [props])

  return null
}

export default Circle
