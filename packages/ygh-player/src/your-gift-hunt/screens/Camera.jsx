import React, { useState, useEffect } from "react"
import styled, { css } from "styled-components"
import _ from "utils"

import QrReader from "react-qr-reader"

import Screen from "./Screen"

const StyledScreen = styled(Screen)`
  bottom: 0;
  z-index: 5;
`

const CameraBackground = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  background-color: #000;
  color: #fff;

  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  transform: translate(0, ${props => (props.isVisible ? 0 : 100)}%);
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
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  section {
    padding-top: 0 !important;
    height: 100% !important;

    div {
      border-width: calc(50vh - 40vmin) calc(50vw - 40vmin) !important;

      box-shadow: inset 0 0 0 1vw #f44336 !important;

      ${props =>
        props.data !== null &&
        css`
          box-shadow: inset 0 0 0 1vw #8bc34a !important;
        `}

      ${props =>
        props.duplicate &&
        css`
          box-shadow: inset 0 0 0 1vw #ffc107 !important;
        `}
    }
  }
`

const Message = styled.p`
  position: absolute;
  left: 10vw;
  right: 10vw;
  bottom: 4em;
  z-index: 2;

  text-align: center;
`

const CameraScreen = ({ isVisible, close, onScanCode, entities, error }) => {
  const initialState = {
    data: null,
    duplicate: false
  }

  const [state, setState] = useState(initialState)

  useEffect(() => {
    setState(initialState)
  }, [isVisible])

  function handleOnError(error) {
    console.error(error)
    setState({ error })
  }

  function handleOnScan(data) {
    if (data !== null && data !== state.data) {
      if (!entities.some(entity => _.getInputValue("code")(entity) === data)) {
        setState({ data })
        onScanCode && onScanCode(data)
      } else {
        setState({ data, duplicate: true })
      }
    }
  }

  return (
    <StyledScreen isVisible={isVisible}>
      <CameraBackground isVisible={isVisible}>
        <CloseButton onClick={close} />
        {isVisible && (
          <StyledQrReader
            delay={500}
            onError={handleOnError}
            onScan={handleOnScan}
            {...state}
          />
        )}
        {error && <Message>{error}</Message>}
        {state.duplicate && (
          <Message>You have already scanned this code.</Message>
        )}
        {state.error && <Message>{JSON.stringify(state.error)}</Message>}
      </CameraBackground>
    </StyledScreen>
  )
}

export default CameraScreen