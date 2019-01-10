import { useEffect, useContext } from 'react'
import { ReactReduxContext } from 'react-redux'
import { ReduxFirestoreContext } from 'react-redux-firebase'

const useFirestoreListener = (query, readKey) => {
  const { storeState } = useContext(ReactReduxContext)
  const firestore = useContext(ReduxFirestoreContext)

  useEffect(() => {
    firestore.setListener(query)
    return () => {
      firestore.unsetListener(query)
    }
  }, [])

  return storeState.firestore.ordered[readKey]
}

export default useFirestoreListener
