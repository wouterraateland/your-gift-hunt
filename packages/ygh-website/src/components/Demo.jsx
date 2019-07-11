import React, { useCallback } from "react"
import styled from "styled-components"

import useModal from "hooks/useModal"

import { Play } from "ygh-icons"
import { Button } from "ygh-ui"
import PreviewCompatibleImage from "components/PreviewCompatibleImage"
import SubscribeModal from "components/SubscribeModal"

const Container = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;

  border-radius: ${props => props.theme.borderRadius};
  box-shadow: ${props => props.theme.boxShadow.large};

  background-color: #0001;
`

const DemoButton = styled(Button)`
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
`

const Demo = ({ imageInfo, url }) => {
  const { popup } = useModal()
  const onDemoClick = useCallback(() => {
    window.open(url, "_blank")
    popup(<SubscribeModal />)
  }, [])

  return (
    <>
      <Container>
        <PreviewCompatibleImage imageInfo={imageInfo} />
        <DemoButton
          size="large"
          importance="primary"
          color="primary"
          onClick={onDemoClick}
        >
          <Play />
          &nbsp;&nbsp;&nbsp;Play demo
        </DemoButton>
      </Container>
    </>
  )
}

export default Demo
