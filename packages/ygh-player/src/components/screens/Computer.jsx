import React from 'react'
import styled from 'styled-components'

const Computer = styled.div`

`

const ComputerScreen = ({ isOpen }) => {
  return (
    <Computer isOpen={isOpen} />
  )
}

export default ComputerScreen
