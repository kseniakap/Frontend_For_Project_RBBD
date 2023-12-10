import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LastAddPosts } from '../lastAddPosts/LastAddPosts'
import { PostItem } from '../postItem/PostItem'
import { getAllPosts } from './../../redux/features/post/postSlice'
import st from './AdminBlock.module.scss'

const AdminBlock = () => {
  const dispatch = useDispatch()
  const { posts, popularPosts } = useSelector((state) => state.post)

  useEffect(() => {
    dispatch(getAllPosts())
  }, [dispatch])

  if (!posts.length) {
    return (
      <div className="text-xl text-center text-white py-10">
        Постов не существует.
      </div>
    )
  }
  return (
    <div style={{ marginBottom: '20px' }}>
      <h2 className={st.title}>Панель админа</h2>
      <h3>Все посты:</h3>
      <div className={st.wrapper}>
        {posts?.map((post, idx) => (
          <PostItem key={idx} post={post} />
        ))}
      </div>
      <h3>Непроверенные посты:</h3>
      <div className={st.wrapper}>
        {posts
          ?.filter((item) => item.checkAdmin === false)
          .map((post, idx) => (
            <PostItem key={idx} post={post} />
          ))}
      </div>
      <div className={st.lastAddition}>
        <h3 className={st.subtitle}>Последние добавленные:</h3>

        {popularPosts?.map((post, idx) => (
          <LastAddPosts key={idx} post={post} />
        ))}
      </div>
    </div>
  )
}

export default AdminBlock
