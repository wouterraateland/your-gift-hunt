import React, { useCallback, useState } from "react"
import styled from "styled-components"

const Container = styled.label.attrs(({ src }) => ({
  style: {
    backgroundImage: `url(${src})`
  }
}))`
  position: relative;
  display: block;

  background: #0001 no-repeat center / cover;
`

const Input = styled.input`
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  opacity: 0;
`

const EditableAvatar = ({ placeholder, onChange, ...otherProps }) => {
  const [uploadedAvatar, setUploadedAvatar] = useState(null)

  const handleOnChange = useCallback(event => {
    if (event.target.files.length !== 1) {
      return
    }

    const reader = new FileReader()
    reader.onload = e => {
      setUploadedAvatar(e.target.result)
    }
    reader.readAsDataURL(event.target.files[0])
    onChange(event.target.files[0])
  }, [])

  return (
    <Container
      src={uploadedAvatar ? uploadedAvatar : placeholder}
      {...otherProps}
    >
      <Input type="file" accept="image/*" onChange={handleOnChange} />
    </Container>
  )
}

export default EditableAvatar
