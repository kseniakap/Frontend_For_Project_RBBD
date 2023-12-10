import React from 'react'
import { useEffect, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updatePost } from './../../redux/features/post/postSlice'

import axios from '../../utils/axios'

import st from './../addNewPost/AddNewPost.module.scss'

const ChangePost = () => {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [artist, setArtist] = useState('')
  const [oldImage, setOldImage] = useState('')
  const [newImage, setNewImage] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`)
    setTitle(data.title)
    setArtist(data.artist)
    setText(data.text)
    setOldImage(data.imgUrl)
  }, [params.id])

  const submitHandler = () => {
    try {
      const updatedPost = new FormData()
      updatedPost.append('title', title)
      updatedPost.append('text', text)
      updatedPost.append('artist', artist)
      updatedPost.append('id', params.id)
      updatedPost.append('image', newImage)
      dispatch(updatePost(updatedPost))
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const clearFormHandler = () => {
    setTitle('')
    setText('')
    setArtist('')
  }

  useEffect(() => {
    fetchPost()
  }, [fetchPost])
  return (
    <form className={st.form} onSubmit={(e) => e.preventDefault()}>
      <label className={st.addPhoto}>
        Добавить изорбажение:
        <input
          type="file"
          className="hidden"
          onChange={(e) => {
            setNewImage(e.target.files[0])
            setOldImage('')
          }}
        />
      </label>
      <div className={st.img}>
        {oldImage && (
          <img src={`http://localhost:3006/${oldImage}`} alt={oldImage.name} />
        )}
        {newImage && (
          <img src={URL.createObjectURL(newImage)} alt={newImage.name} />
        )}
      </div>

      <label>
        Заголовок поста:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Введите название песни"
          className={st.field}
        />
      </label>

      <label>
        Исполнитель:
        <input
          type="text"
          onChange={(e) => setArtist(e.target.value)}
          value={artist}
          placeholder="Введите исполнителя песни"
          className={st.field}
        />
      </label>

      <label className={st.lyrics}>
        Текст песни:
        <textarea
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder="Введите текст песни"
        />
      </label>

      <div className={st.btns}>
        <button onClick={submitHandler} className={st.addBtn}>
          Обновить
        </button>

        <button onClick={clearFormHandler} className={st.cancelBtn}>
          Отменить
        </button>
      </div>
    </form>
  )
}

export default ChangePost
