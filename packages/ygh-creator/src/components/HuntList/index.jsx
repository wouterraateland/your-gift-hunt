import React from 'react'

import HuntThumb from './Thumb'
import EmptyHuntList from './Empty'

const HuntList = ({ hunts }) => {
  return hunts.length
    ? hunts.map((hunt, i) => <HuntThumb key={i} {...hunt} />)
    : <EmptyHuntList />
}

export default HuntList
