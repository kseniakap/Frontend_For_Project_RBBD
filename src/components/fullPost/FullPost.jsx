import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  AiFillEye,
  AiOutlineMessage,
  AiTwotoneEdit,
  AiFillDelete,
} from 'react-icons/ai'
import Moment from 'react-moment'

import { toast } from 'react-toastify'

import axios from './../../utils/axios'
import { removePost } from './../../redux/features/post/postSlice'
import {
  createComment,
  getPostComments,
} from './../../redux/features/comment/commentSlice'
import { CommentItem } from './../../components/commentItem/CommentItem'
import st from './FullPost.module.scss'
const FullPost = () => {
  const [post, setPost] = useState(null)
  const [comment, setComment] = useState([])

  const { user } = useSelector((state) => state.auth)
  const { comments } = useSelector((state) => state.comment)
  const navigate = useNavigate()
  const params = useParams()
  const dispatch = useDispatch()

  const removePostHandler = () => {
    try {
      dispatch(removePost(params.id))
      toast('Пост был удален')
      navigate('/posts')
    } catch (error) {
      console.log(error)
    }
  }
  console.log(comments)

  const handleSubmit = () => {
    try {
      const postId = params.id
      dispatch(createComment({ postId, comment }))
      setComment('')
    } catch (error) {
      console.log(error)
    }
  }

  const fetchComments = useCallback(async () => {
    try {
      dispatch(getPostComments(params.id))
    } catch (error) {
      console.log(error)
    }
  }, [params.id, dispatch])

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`)
    setPost(data)
  }, [params.id])

  useEffect(() => {
    fetchPost()
  }, [fetchPost])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  if (!post) {
    return <p>Загрузка...</p>
  }

  const formattedText = post?.text?.split('\n')
  return (
    <div>
      <div className={st.wrapperPost}>
        <Link className={st.goBack} to={'/'}>
          Вернуться назад
        </Link>
        <div className={post?.imgUrl ? st.isImg : st.notImg}>
          {post?.imgUrl && (
            <img
              src={`http://localhost:3006/${post.imgUrl}`}
              alt="Картинка поста"
            />
          )}
        </div>
        <div className={st.rightInfo}>
          {(user?._id === post.author ||
            user?._id === '6574cbec126eb131eb6957b4') && (
            <div className={st.btns}>
              <Link to={`/${params.id}/edit`} className={st.changeBtn}>
                Изменить
              </Link>
              <button onClick={removePostHandler} className={st.deleteBtn}>
                Удалить пост
              </button>
            </div>
          )}
        </div>

        <div className={st.infoPost}>
          <p>{post.username}</p>
          <div className={st.data}>
            <Moment date={post.createdAt} format="D MMM YYYY" />
          </div>

          <div className={st.statistic}>
            <button>
              <AiFillEye /> <span>{post.views}</span>
            </button>
            <button>
              <AiOutlineMessage /> <span>{post.comments?.length || 0} </span>
            </button>
          </div>
        </div>
        <p className={st.title}>{post.title}</p>
        <p className={st.artist}>{post.artist}</p>
        <hr />
        <div className={st.text}>
          {formattedText?.map((item, i) => (
            <p key={i}>{item}</p>
          ))}
        </div>
      </div>
      <h3>Комментарии:</h3>
      <div className={st.allComments}>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Оставить комментарий "
          />
          <button type="submit" onClick={handleSubmit}>
            Отправить
          </button>
        </form>

        {/* Комментарии */}
        {comments?.map((item) => (
          <CommentItem key={item._id} item={item} />
        ))}
      </div>
    </div>
  )
}

export default FullPost
