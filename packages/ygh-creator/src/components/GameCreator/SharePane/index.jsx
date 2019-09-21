import React, { useRef } from "react"
import styled from "styled-components"

import useGame from "hooks/useGame"

import Icons from "ygh-icons"
import { Field, Button } from "ygh-ui"

const Container = styled.div`
  height: 100%;
  padding: 0.5rem;

  line-height: 1.5;

  background-color: #f9f9f9;
`

const ShareButton = styled(Button)`
  margin: 0 0.5rem 0.5rem 0;
`

const SharePane = () => {
  const ref = useRef(null)
  const { game } = useGame()

  const url = `${process.env.REACT_APP_PLAY_URL}/${game.id}`

  return (
    <Container>
      <h2>Congrats, you published your game!</h2>
      <a href={`${process.env.REACT_APP_SHOWCASE_URL}/${game.id}`}>
        View in the showcase
      </a>
      <p>Copy the link</p>
      <Field
        ref={ref}
        block
        onChange={() => {}}
        onClick={() => {
          if (ref.current) {
            ref.current.querySelector("input").select()
            document.execCommand("copy")
          }
        }}
        value={url}
      />
      <p>Or share on socials</p>
      <ShareButton
        color="#3C5A99"
        importance="primary"
        lead={<Icons.Facebook size={1} />}
        onClick={() =>
          window.open(`https://www.facebook.com/sharer?u=${url}`, "_blank")
        }
      >
        Share
      </ShareButton>
      <ShareButton
        color="#1DA1F2"
        importance="primary"
        lead={<Icons.Twitter size={1} />}
        onClick={() =>
          window.open(`https://twitter.com/intent/tweet?text=${url}`, "_blank")
        }
      >
        Tweet
      </ShareButton>
    </Container>
  )
}

export default SharePane
