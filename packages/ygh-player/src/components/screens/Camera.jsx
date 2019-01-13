import React from 'react'
import styled from 'styled-components'

const Camera = styled.div`

`

const CameraScreen = ({ isOpen }) => {
  return (
    <Camera isOpen={isOpen} />
  )
}

export default CameraScreen
