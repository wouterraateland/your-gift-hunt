import { useEffect } from "react"

import { PRIVACY, ACCESS_TYPES } from "data"
import randomString from "randomstring"

import useAuth from "hooks/useAuth"
import { useMutation } from "react-apollo-hooks"
import { navigate } from "@reach/router"

import { USER_GAMES } from "gql/queries"
import { CREATE_GAME } from "gql/mutations"

const saveGame = gameId => {
  const myGames =
    JSON.parse(window.localStorage.getItem("ygh-creator.my-games")) || []
  window.localStorage.setItem(
    "ygh-creator.my-games",
    JSON.stringify(myGames.concat(gameId))
  )
}

const NewGamePage = () => {
  const { isLoggedIn, user } = useAuth()
  const createGameMutation = useMutation(CREATE_GAME)

  useEffect(() => {
    const createGame = async () => {
      const {
        data: {
          createGame: { id }
        }
      } = await createGameMutation({
        variables: {
          name: "Nameless",
          slug: randomString.generate(10),
          description: "",
          creator: isLoggedIn ? { connect: { id: user.id } } : null,
          cooperators: isLoggedIn ? { connect: [{ id: user.id }] } : null,
          privacy: PRIVACY.PUBLIC,
          accessType: ACCESS_TYPES.NONE,
          accessCode: ""
        },
        refetchQueries: isLoggedIn
          ? [
              {
                query: USER_GAMES,
                variables: { userId: user.id, slugPrefix: "" }
              }
            ]
          : []
      })

      saveGame(id)

      navigate(`/edit/${id}`, { replace: true })
    }

    createGame()
  }, [])

  return null
}

export default NewGamePage
