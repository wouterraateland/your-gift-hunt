import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const LoaderContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;

  align-items: center;
  justify-content: center;

  text-align: center;

  font-size: 10vw;
`

const LoaderText = styled.p``

export default () => {
  const [dotCount, setDotCount] = useState(0)

  useEffect(() => {
    const i = setInterval(() => {
      setDotCount(dotCount => (dotCount + 1) % 4)
    }, 500)

    return () => {
      clearInterval(i)
    }
  }, [])

  return (
    <LoaderContainer>
      <LoaderText>Loading{'.'.repeat(dotCount)}</LoaderText>
    </LoaderContainer>
  )
}
