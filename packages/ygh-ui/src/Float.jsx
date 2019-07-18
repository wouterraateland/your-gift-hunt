import styled from "styled-components"

export const FloatLeft = styled.div`
  float: left;
`
FloatLeft.displayName = "FloatLeft"

export const FloatNone = styled.div`
  float: none;
`
FloatNone.displayName = "FloatNone"

export const FloatRight = styled.div`
  float: right;
`
FloatRight.displayName = "FloatRight"

export const Float = styled.div`
  float: inherit;
`
Float.displayName = "FloatInherit"

Float.Left = FloatLeft
Float.None = FloatNone
Float.Right = FloatRight

export default Float
