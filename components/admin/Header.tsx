import { Session } from 'next-auth'
import React from 'react'

const Header = ({session}: {session:Session}) => {
  return (
    <div>Header</div>
  )
}

export default Header