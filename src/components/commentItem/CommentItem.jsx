import React from 'react'
import { useSelector } from 'react-redux'

import st from './CommentItem.module.scss'

export const CommentItem = ({ item }) => {
//   const { user } = useSelector((state) => state.auth)

//   const author = user?.username.trim().toUpperCase().split('').slice(0, 2)
  return (
    <div className={st.item}>
      <div className={st.author}>
        <p></p>
      </div>
      <div className={st.content}>{item.comment}</div>
    </div>
  )
}
