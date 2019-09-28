import React from "react"
import Helmet from "react-helmet"

import useGame from "hooks/useGame"

const GameSEO = () => {
  const { game } = useGame()

  return (
    <Helmet>
      <title>{game.name} | Your Gift Hunt</title>
      <meta name="title" content={`${game.name} | Your Gift Hunt`} />
      <meta
        name="description"
        content={
          game.description
            ? game.description
            : `A game made by ${game.creator ? game.creator.name : "anonymous"}`
        }
      />

      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={`https://yourgifthunt.com/play/${game.id}`}
      />
      <meta property="og:title" content={`${game.name} | Your Gift Hunt`} />
      <meta
        property="og:description"
        content={
          game.description
            ? game.description
            : `A game made by ${game.creator ? game.creator.name : "anonymous"}`
        }
      />
      {game.image && <meta property="og:image" content={game.image} />}

      <meta property="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:url"
        content={`https://yourgifthunt.com/play/${game.id}`}
      />
      <meta
        property="twitter:title"
        content={`${game.name} | Your Gift Hunt`}
      />
      <meta
        property="twitter:description"
        content={
          game.description
            ? game.description
            : `A game made by ${game.creator ? game.creator.name : "anonymous"}`
        }
      />
      {game.image && <meta property="twitter:image" content={game.image} />}
    </Helmet>
  )
}

export default GameSEO
