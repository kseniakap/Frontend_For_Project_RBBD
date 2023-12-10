import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkIsAuth, loginUser } from '../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import './../index.css'

export const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { status } = useSelector((state) => state.auth)
  const isAuth = useSelector(checkIsAuth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (status) toast(status)
    if (isAuth) navigate('/')
  }, [status, isAuth, navigate])

  const handleSubmit = () => {
    try {
      dispatch(loginUser({ username, password }))
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="block">
      <form onSubmit={(e) => e.preventDefault()} className="form">
        <h2>Авторизация</h2>
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
          <button type="submit" onClick={handleSubmit} className="comfirmBtn">
            Войти
          </button>
          <Link to="/register">Нет аккаунта ?</Link>
        </div>
      </form>
      <Link className="backBtn" to="/">
        Продолжить без авторизации
      </Link>
    </div>
  )
}
