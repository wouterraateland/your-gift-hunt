import React, { useContext, useState } from 'react'
import styled, { css } from 'styled-components'

import StoreContext from 'context/Store'

import QrReader from 'react-qr-reader'

const CameraBackground = styled.div`
  position: fixed;
  left: 0; top: 0;
  right: 0; bottom: 0;

  background-color: #000;
  color: #fff;

  transition: transform .4s cubic-bezier(0.4, 0, 0.2, 1);

  transform: translate(0, ${props => props.visible ? 0 : 100}%);
`

const CloseButton = styled.div`
  cursor: pointer;

  position: absolute;
  left: 50%; top: 3rem;
  z-index: 2;

  width: 3rem;
  height: 3rem;

  transform: translate(-50%, -50%);

  &::before, &::after {
    content: '';

    position: absolute
    left: 0; top: 0;
    right: 0; bottom: 0;

    width: 100%;
    height: 10%;
    margin: auto;

    background-color: currentColor;
  }

  &::before { transform: rotate(45deg); }
  &::after { transform: rotate(-45deg); }
`

const StyledQrReader = styled(QrReader)`
  position: absolute;
  left: 0; top: 0;
  right: 0; bottom: 0;

  section {
    padding-top: 0 !important;
    height: 100% !important;

    div {
      border-width: calc(${window.innerHeight / 2}px - 40vw) 10vw !important;

      box-shadow: inset 0 0 0 1vw #f44336 !important;

      ${props => props.data !== null && css`
        box-shadow: inset 0 0 0 1vw #8bc34a !important;
      `}

      ${props => props.duplicate && css`
        box-shadow: inset 0 0 0 1vw #ffc107 !important;
      `}
    }
  }
`

const Message = styled.p`
  position: absolute;
  left: 10vw;
  right: 10vw; bottom: 4em;
  z-index: 2;

  text-align: center;
`

const initialState = { data: null, duplicate: false }

const Camera = () => {
  const { read, write } = useContext(StoreContext)
  const [state, setState] = useState(initialState)

  const visible = read('cameraOpened', false)
  function handleOnCloseClick() {
    setState(initialState)
    write('cameraOpened', false)
  }
  function handleOnError(error) { setState({ error }) }
  function handleOnScan(data) {
    if (data !== null && data !== state.data) {
      const codes = read('codes', [])

      if (!codes.includes(data)) {
        setState({ data })
        write('codes', [...codes, data])
        handleOnCloseClick()
      } else {
        setState({ data, duplicate: true })
      }
    }
  }

  return (
    <CameraBackground visible={visible}>
      <CloseButton onClick={handleOnCloseClick} />
      {visible && <StyledQrReader
        delay={500}
        onError={handleOnError}
        onScan={handleOnScan}
        {...state}
      />}
      {state.duplicate && <Message>Je hebt deze code al gescand.</Message>}
      {state.error && <Message>{JSON.stringify(state.error)}</Message>}
    </CameraBackground>
  )
}

export default Camera
