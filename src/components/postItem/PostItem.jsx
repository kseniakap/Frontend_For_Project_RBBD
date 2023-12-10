import React, { useState } from 'react'
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai'
import Moment from 'react-moment'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { checkPostAdmin } from '../../redux/features/post/postSlice'
import { useLocation } from 'react-router-dom'
import st from './PostItem.module.scss'

export const PostItem = ({ post }) => {
  const dispatch = useDispatch()
  const location = useLocation()

  const [addPost, setAddPost] = useState(false)
  //Опубликован ли пост

  if (!post) {
    return <div className="text-xl text-center  py-10">Загрузка...</div>
  }
  const id = post._id
  const submitHandler = () => {
    try {
      setAddPost(true)
      dispatch(checkPostAdmin({ id, checkAdmin: true }))
    } catch (error) {
      console.log(error)
    }
  }
  // console.log(post)
  return (
    <Link to={`/${post._id}`} className={st.post}>
      {!post.checkAdmin && (
        <button
          className={st.publishBtn}
          onClick={(e) => {
            e.preventDefault()
            submitHandler(post.id)
          }}
        >
          {addPost ? 'Добавлен' : 'Опубликовать'}
        </button>
      )}
      <div className={st.content}>
        <div className={post.imgUrl ? st.image : st.notImage}>
          {post.imgUrl && (
            <img
              src={`http://localhost:3006/${post.imgUrl}`}
              alt="Изображение"
            />
          )}
        </div>
        <div className={st.infoPost}>
          <div className={st.name}>{post.username}</div>
          <div className={st.data}>
            <Moment date={post.createdAt} format="DD.MM.YYYY" />
          </div>
        </div>
        <div className={st.title}>{post.title}</div>
        <p className={st.artist}>{post.artist}</p>
        {!location.pathname.includes('/admin') && (
          <div className={st.bottom}>
            <button className={st.views}>
              <AiFillEye /> <span>{post.views}</span>
            </button>
            <button className={st.comments}>
              <AiOutlineMessage /> <span>{post.comments?.length || 0} </span>
            </button>
          </div>
        )}
      </div>
    </Link>
  )
}
