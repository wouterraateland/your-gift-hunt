import { useState } from 'react'

const getValue = (obj, key) => (
  key.split('.').reduce((v, part) => v[part], obj)
)

const isMatch = (obj, key, query) => (
  !query ||
  getValue(obj, key).toLowerCase().includes(query.toLowerCase())
)

const useQuery = (data=[], keys=[]) => {
  const [query, setQuery] = useState('')

  return {
    query,
    setQuery,
    filteredData: data.filter(obj => keys.some(key => isMatch(obj, key, query)))
  }
}

export default useQuery
