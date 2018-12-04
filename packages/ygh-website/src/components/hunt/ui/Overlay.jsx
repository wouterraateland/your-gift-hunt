import styled, { css } from 'styled-components'

const OverlayInner = styled.div`
  width: 100%;
  max-width: 512px;
  padding: 2em;
`

OverlayInner.displayName = 'OverlayInner'

const Overlay = styled.div`
  position: fixed;
  left: 0; top: 0;
  right: 0; bottom: 0;
  z-index: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, .3);
  color: #fff;

  ${props => props.visible
    ? css`
        opacity: 1;
      `
    : css`
        pointer-events: none;
        opacity: 0;
      `
  }
`

Overlay.displayName = 'Overlay'
Overlay.Inner = OverlayInner

export default Overlay
