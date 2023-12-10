import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createPost } from './../../redux/features/post/postSlice'
import st from './AddNewPost.module.scss'

const AddNewPost = ({ setAddNewPost }) => {
  //Состояния
  const [title, setTitle] = useState('')
  const [artist, setArtist] = useState('')
  const [text, setText] = useState('')
  const [image, setImage] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = () => {
    try {
      const data = new FormData()
      data.append('title', title)
      data.append('artist', artist)
      data.append('text', text)
      data.append('image', image)
      dispatch(createPost(data))
      navigate('/')
      setAddNewPost(true)
      setTimeout(() => {
        setAddNewPost(false)
      }, 3000)
    } catch (error) {
      console.log(error)
    }
  }
  const clearFormHandler = () => {
    setText('')
    setTitle('')
    setArtist('')
  }
  return (
    <>
      <h2 className={st.title}>Создание новой записи</h2>
      <form className={st.form} onSubmit={(e) => e.preventDefault()}>
        <label className={st.addPhoto}>
          Добавить изорбажение:
          <input
            type="file"
            className="hidden"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>
        <div className={st.img}>
          {image && <img src={URL.createObjectURL(image)} alt={image.name} />}
        </div>

        <label>
          Название песни:
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
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
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
            Добавить
          </button>

          <button onClick={clearFormHandler} className={st.cancelBtn}>
            Отменить
          </button>
        </div>
      </form>
    </>
  )
}

export default AddNewPost
