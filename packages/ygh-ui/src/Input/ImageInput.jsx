import React, { useCallback, useState } from "react"
import styled from "styled-components"

import InputContainer from "./InputContainer"

const Input = styled.input`
  cursor: pointer;
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
    onChange(event.target.files[0])
  }, [])

  return (
    <InputContainer
      style={{
        backgroundImage: `url(${uploadedImage ? uploadedImage : placeholder}})`
      }}
      {...otherProps}
    >
      <Input type="file" accept="image/*" onChange={handleOnChange} />
    </InputContainer>
  )
}

export default ImageInput
