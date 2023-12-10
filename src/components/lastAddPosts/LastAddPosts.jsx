import React from 'react'
import { Link } from 'react-router-dom'
import st from "./LastAddPosts.module.scss"

export const LastAddPosts = ({ post }) => {
  return (
    <div className={st.item}>
      <Link to={`/${post._id}` }>{post.title}</Link>
    </div>
  )
}
