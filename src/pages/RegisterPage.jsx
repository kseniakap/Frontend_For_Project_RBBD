import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser, checkIsAuth } from '../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import './../index.css'

export const RegisterPage = () => {
  const [username, setUsername] = useState('')
  //Состояние для имени пользователя
  const [password, setPassword] = useState('')
  // Состояние для пароля
  const { status } = useSelector((state) => state.auth)
  const isAuth = useSelector(checkIsAuth)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (status) {
      toast(status)
    }
    if (isAuth) navigate('/')
  }, [status, isAuth, navigate])

  const handleSubmit = () => {
    try {
      dispatch(registerUser({ username, password }))
      setPassword('')
      setUsername('')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="block">
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <h2>Регистрация</h2>

        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Введите имя пользоваетеля"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Введите пароль"
        />

        <div className="btns">
          <button className="comfirmBtn" type="submit" onClick={handleSubmit}>
            Подтвердить
          </button>
          <Link to="/login">Есть аккаунт ?</Link>
        </div>
      </form>
      <Link className='backBtn' to="/"> Продолжить без авторизации</Link>
    </div>
  )
}
