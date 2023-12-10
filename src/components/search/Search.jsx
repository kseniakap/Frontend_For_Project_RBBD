import React from 'react'
import st from './Search.module.scss'

const Search = ({ setSeachByName, setSeachByArtist }) => {
  return (
    <>
      <div className={st.search}>
        <input
          type="text"
          placeholder="Введите название песни"
          onChange={(e) => setSeachByName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Введите исполнителя"
          onChange={(e) => setSeachByArtist(e.target.value)}
        />
      </div>
    </>
  )
}

export default Search
