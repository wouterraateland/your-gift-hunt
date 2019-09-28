import { PRIVACY } from "data"
import { useCallback } from "react"
import useAuth from "hooks/useAuth"
import { useQuery, useMutation } from "react-apollo-hooks"
import { TEST_SERVICE, USER_GAMES } from "gql/queries"
import { CREATE_GAME_PLAY, DELETE_GAME, PUBLISH_GAME } from "gql/mutations"
import Client from "shopify-buy"

const client = Client.buildClient({
  storefrontAccessToken: process.env.REACT_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  domain: "your-gift-hunt.myshopify.com"
})

const PLAY_URL =
  process.env.REACT_APP_PLAY_URL || `https://yourgifthunt.com/play`

const useMetaActions = game => {
  const { user } = useAuth()
  const gameId = game.id
  const userId = user ? user.id : null

  const { loading, data } = useQuery(TEST_SERVICE)
  const deleteGameMutation = useMutation(DELETE_GAME)
  const createGamePlayMutation = useMutation(CREATE_GAME_PLAY)
  const publishGamePlayMutation = useMutation(PUBLISH_GAME)

  const deleteGame = useCallback(async () => {
    await deleteGameMutation({
      variables: { gameId },
      update: (
        proxy,
        {
          data: {
            deleteGame: { id }
          }
        }
      ) => {
        const query = {
          query: USER_GAMES,
          variables: {
            userId,
            slugPrefix: ""
          }
        }

        const { user } = proxy.readQuery(query)
        const gameIndex = user.games.findIndex(game => game.id === id)
        if (gameIndex !== -1) {
          user.games.splice(gameIndex, 1)
        }

        proxy.writeQuery({
          ...query,
          data: {
            user
          }
        })
      }
    })
  }, [gameId, userId])

  const testGame = useCallback(async () => {
    if (loading) {
      return
    }

    const newWindow = window.open("", "_blank")

    const response = await createGamePlayMutation({
      variables: {
        gameId,
        player: userId ? { connect: { id: userId } } : null,
        serviceId: data.service.id
      }
    })

    const playToken = response.data.createGamePlay.id

    newWindow.location = `${PLAY_URL}/${game.id}?playToken=${playToken}`
  }, [gameId, userId, loading, data])

  const publishGame = useCallback(async () => {
    let paid = true
    if (game.privacy === PRIVACY.PRIVATE) {
      const variantId =
        "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xNjg2MzAxNjkxMDk0OA=="
      const checkout = await client.checkout.create()
      await client.checkout.addLineItems(checkout.id, [
        {
          variantId,
          quantity: 1,
          customAttributes: [{ key: "Game name", value: game.name }]
        }
      ])
      await client.checkout.updateEmail(checkout.id, user.user_metadata.email)
      await client.checkout.updateShippingAddress(checkout.id, {
        address1: null,
        address2: null,
        city: null,
        company: null,
        country: null,
        firstName: user.user_metadata.first_name,
        lastName: user.user_metadata.last_name,
        phone: null,
        province: null,
        zip: null
      })

      const checkoutWindow = window.open(checkout.webUrl)
      await new Promise(resolve => {
        let i1, i2
        i1 = setInterval(() => {
          if (checkoutWindow.closed) {
            clearInterval(i1)
            clearInterval(i2)
            resolve()
          }
        }, 500)
        i2 = setInterval(async () => {
          const resultingCheckout = await client.checkout.fetch(checkout.id)
          if (resultingCheckout.completedAt !== null) {
            clearInterval(i1)
            clearInterval(i2)
            resolve()
          }
        }, 2000)
      })
      const resultingCheckout = await client.checkout.fetch(checkout.id)
      paid = resultingCheckout.completedAt !== null
    }

    if (paid) {
      await publishGamePlayMutation({
        variables: {
          gameId,
          now: new Date().toJSON()
        }
      })
      return true
    } else {
      return false
    }
  }, [gameId, userId])

  return {
    deleteGame,
    testGame,
    publishGame
  }
}

export default useMetaActions
