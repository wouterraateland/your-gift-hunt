import React, { useCallback, useState } from "react"
import styled, { css } from "styled-components"

import { Plus } from "ygh-icons"

import InputContainer from "./InputContainer"

const Container = styled(InputContainer)`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 8em;
  height: 6em;

  color: #0002;

  ${props =>
    !props.disabled &&
    css`
      cursor: pointer;
      &:hover {
        color: #0004;
      }
    `}
`

const Input = styled.input`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  opacity: 0;
`

const ImageInput = ({ placeholder, onChange, ...otherProps }) => {
  const [uploadedImage, setUploadedImage] = useState(null)

  const handleOnChange = useCallback(event => {
    if (event.target.files.length !== 1) {
      return
    }

    const reader = new FileReader()
    reader.onload = e => {
      setUploadedImage(e.target.result)
    }
    reader.readAsDataURL(event.target.files[0])
    onChange && onChange(event.target.files[0])
  }, [])

  return (
    <Container
      style={{
        backgroundImage: `url(${uploadedImage ? uploadedImage : placeholder})`
      }}
      {...otherProps}
    >
      <Input
        type="file"
        accept="image/*"
        onChange={handleOnChange}
        {...otherProps}
      />
      <Plus size={2} />
    </Container>
  )
}

export default ImageInput
