import styled from 'styled-components'

const Scene = styled.div.attrs(({ width, height }) => ({
  style: {
    width: `${width}em`,
    height: `${height}em`,
  }
}))`
  position: relative;
  
  border: 10em solid transparent;
  background: #999;
`

export default Scene
