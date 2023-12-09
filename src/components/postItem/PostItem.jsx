import React, { useState } from 'react'
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai'
import Moment from 'react-moment'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { checkPostAdmin } from '../../redux/features/post/postSlice'
import st from './PostItem.module.scss'

export const PostItem = ({ post }) => {
  const dispatch = useDispatch()

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
    <Link to={`/${post._id}`}>
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

      <div className="flex flex-col basis-1/4 flex-grow">
        <div
          className={post.imgUrl ? 'flex rouded-sm h-80' : 'flex rounded-sm'}
        >
          {post.imgUrl && (
            <img
              src={`http://localhost:3006/${post.imgUrl}`}
              alt="img"
              className="object-cover w-full"
            />
          )}
        </div>
        <div className="flex justify-between items-center pt-2">
          <div className="text-xs opacity-50">{post.username}</div>
          <div className="text-xs  opacity-50">
            <Moment date={post.createdAt} format="D MMM YYYY" />
          </div>
        </div>
        <div className="   text-xl">{post.title}</div>
        <p>{post.artist}</p>

        <div className="flex gap-3 items-center mt-2">
          <button className="flex items-center justify-center gap-2 text-xs  opacity-50">
            <AiFillEye /> <span>{post.views}</span>
          </button>
          <button className="flex items-center justify-center gap-2 text-xs  opacity-50">
            <AiOutlineMessage /> <span>{post.comments?.length || 0} </span>
          </button>
        </div>
      </div>
    </Link>
  )
}
