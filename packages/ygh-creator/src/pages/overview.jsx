import React, { useContext } from "react"
import { Link } from "@reach/router"

import AuthContext from "contexts/Auth"
import useQuery from "hooks/useQuery"

import { Wrapper, Paper, Float, Input, Button } from "your-gift-hunt/ui"
import Layout from "layouts/Overview"
import HuntList from "components/HuntList"

const OverviewPage = () => {
  useContext(AuthContext)
  const allHunts = []
  // const allHunts = useFirestoreListener(
  //   {
  //     collection: "hunts",
  //     where: ["creator", "==", userRef]
  //   },
  //   "hunts"
  // )

  const { query, setQuery, filteredData: hunts } = useQuery(allHunts, ["name"])

  return (
    <Layout>
      <Wrapper>
        <Paper>
          <Paper.Section>
            <Float.Left>
              <Input
                type="search"
                value={query}
                onChange={event => setQuery(event.target.value)}
              />
            </Float.Left>
            <Float.Right>
              <Button importance="primary" color="accent" as={Link} to="/new">
                New hunt
              </Button>
            </Float.Right>
          </Paper.Section>
          <HuntList hunts={hunts} />
        </Paper>
      </Wrapper>
    </Layout>
  )
}

export default OverviewPage

/*
  const allHunts = [
    {
      id: 1,
      name: 'Pioneer hunt',
      slug: 'pioneer-hunt',
      creator: {
        id: 2,
        name: "Wouter"
      },
      updatedAt: moment().subtract(2, 'days')
    },
    {
      id: 4,
      name: 'Another hunt',
      slug: 'another-hunt',
      creator: {
        id: 3,
        name: "Swaab"
      },
      updatedAt: moment().subtract(4, 'days')
    }
  ]
*/
