import React from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { searchByNameAndArist } from './../../redux/features/post/postSlice'
import { checkIsAuth, logout } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'

import st from './Header.module.scss'
import './../../index.css'

export const Header = ({ addNewPost }) => {
  const dispatch = useDispatch()
  const location = useLocation()

  const isAuth = useSelector(checkIsAuth)
  const { user } = useSelector((state) => state.auth)

  const activeStyles = {
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
  }

  const logoutHandler = () => {
    dispatch(logout())
    window.localStorage.removeItem('token')
    toast('Вы вышли из системы')
  }

  return (
    <header className={st.header}>
      <div className="container">
        <div className={st.wrapper}>
          <Link to="/" className={st.logo}></Link>
          {/* {FaAlignCenter} */}
          {addNewPost && (
            <div className={st.addNewPost}>Запись отправлена на проверку</div>
          )}
          <nav>
            {isAuth && (
              <ul className={st.list}>
                <li>
                  <NavLink
                    to={'/'}
                    className={st.item}
                    style={({ isActive }) =>
                      isActive ? activeStyles : undefined
                    }
                  >
                    Главная
                  </NavLink>
                </li>
                {user?._id === '6574cbec126eb131eb6957b4' && (
                  <li>
                    <NavLink
                      to={'/admin'}
                      className={st.item}
                      style={({ isActive }) =>
                        isActive ? activeStyles : undefined
                      }
                    >
                      Панель админа
                    </NavLink>
                  </li>
                )}
                {!user?._id === '6574cbec126eb131eb6957b4' && (
                  <li>
                    <NavLink
                      to={'/posts'}
                      className={st.item}
                      style={({ isActive }) =>
                        isActive ? activeStyles : undefined
                      }
                    >
                      Мои посты
                    </NavLink>
                  </li>
                )}

                <li>
                  <NavLink
                    to={'/new'}
                    className={st.item}
                    style={({ isActive }) =>
                      isActive ? activeStyles : undefined
                    }
                  >
                    Добавить пост
                  </NavLink>
                </li>
              </ul>
            )}
          </nav>
          {user?.username && (
            <p>
              Пользователь: {user?.username}
            </p>
          )}

          <div className={st.logInOut}>
            {isAuth ? (
              <button onClick={logoutHandler}>Выйти</button>
            ) : (
              <Link to={'/login'}> Войти </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
