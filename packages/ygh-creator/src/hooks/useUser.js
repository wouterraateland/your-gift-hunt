import { useQuery } from "react-apollo-hooks"
import useAuth from "hooks/useAuth"

import { USER } from "gql/queries"

const useUser = () => {
  const { user } = useAuth()
  const { data, error } = useQuery(USER, {
    variables: {
      userId: user.user_metadata.prismaUserId
    }
  })
  if (error) {
    throw error
  }

  return {
    user: data.user
  }
}

export default useUser
