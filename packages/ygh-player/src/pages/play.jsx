import React from "react"
import Helmet from "react-helmet"

import { GameProvider } from "contexts/Game"
import { ViewportProvider } from "contexts/Viewport"
import { DragProvider } from "contexts/Drag"
import { ScreenProvider } from "contexts/Screen"
import { HintsProvider } from "contexts/Hints"

import Game from "components/Game"

const GamePage = ({ creatorSlug, gameSlug }) => (
  <ViewportProvider>
    <DragProvider>
      <ScreenProvider>
        <GameProvider creatorSlug={creatorSlug} gameSlug={gameSlug}>
          <HintsProvider>
            <Helmet>
              <title>Private game | Your Gift Hunt</title>
              <meta name="title" content="Private game | Your Gift Hunt" />
              <meta
                name="description"
                content="A game made for specific people. Make sure you have access!"
              />

              <meta property="og:type" content="website" />
              <meta
                property="og:url"
                content={`https://play.yourgifthunt.com/play/${creatorSlug}/${gameSlug}`}
              />
              <meta
                property="og:title"
                content="Private game | Your Gift Hunt"
              />
              <meta
                property="og:description"
                content="A game made for specific people. Make sure you have access!"
              />
              <meta
                property="og:image"
                content="https://play.yourgifthunt.com/images/default_thumb.png"
              />

              <meta property="twitter:card" content="summary_large_image" />
              <meta
                property="twitter:url"
                content={`https://play.yourgifthunt.com/play/${creatorSlug}/${gameSlug}`}
              />
              <meta
                property="twitter:title"
                content="Private game | Your Gift Hunt"
              />
              <meta
                property="twitter:description"
                content="A game made for specific people. Make sure you have access!"
              />
              <meta
                property="twitter:image"
                content="https://play.yourgifthunt.com/images/default_thumb.png"
              />
            </Helmet>
            <Game />
          </HintsProvider>
        </GameProvider>
      </ScreenProvider>
    </DragProvider>
  </ViewportProvider>
)

export default GamePage
