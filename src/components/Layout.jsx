import React from 'react'
import { Header } from './header/Header'
import { useLocation } from 'react-router-dom'
import './../index.css'

export const Layout = ({ children, addNewPost }) => {
  const location = useLocation()
  return (
    <>
      {!(location.pathname.includes('/register') ||
        location.pathname.includes('/login')) && <Header addNewPost={addNewPost} />}

      <div className="container">{children}</div>
    </>
  )
}
