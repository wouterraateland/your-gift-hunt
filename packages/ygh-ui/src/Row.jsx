import styled from "styled-components"

const Row = styled.div`
  margin-left: -${props => props.theme.columns.gap};
  margin-right: -${props => props.theme.columns.gap};

  display: flex;
  flex-wrap: wrap;
  flex-direction: ${props => (props.align === "right" ? "row-reverse" : "row")};
  align-items: ${props =>
    props.vAlign === "top"
      ? "flex-start"
      : props.vAlign === "bottom"
      ? "flex-end"
      : "center"};
  justify-content: ${props =>
    props.align === "left" ? "flex-start" : "center"};
`

export default Row
