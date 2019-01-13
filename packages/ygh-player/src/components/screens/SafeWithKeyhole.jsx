import React from 'react'
import styled from 'styled-components'

const SafeWithKeyhole = styled.div`

`

const SafeWithKeyholeScreen = ({ isOpen }) => {
  return (
    <SafeWithKeyhole isOpen={isOpen} />
  )
}

export default SafeWithKeyholeScreen
