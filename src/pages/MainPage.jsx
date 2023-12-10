import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PostItem } from '../components/postItem/PostItem'
import { getAllPosts } from '../redux/features/post/postSlice'
import Search from '../components/search/Search'

export const MainPage = () => {
  const dispatch = useDispatch()
  const { posts } = useSelector((state) => state.post)
  const [seachByName, setSeachByName] = useState('')
  const [seachByArtist, setSeachByArtist] = useState('')

  useEffect(() => {
    dispatch(getAllPosts())
  }, [dispatch])

  if (!posts?.length) {
    return <p>Посты еще не добавлены</p>
  }
  const allFilter = posts
    ?.filter((item) => item?.checkAdmin === true)
    .filter((item) =>
      item.title.toLowerCase().includes(seachByName.toLowerCase()),
    )
    .filter((item) =>
      item.artist.toLowerCase().includes(seachByArtist.toLowerCase()),
    )

  return (
    <>
      <Search
        setSeachByName={setSeachByName}
        setSeachByArtist={setSeachByArtist}
      />
      {allFilter.length === 0 && (
        <p style={{ textAlign: 'center', display: 'block' }}>
          Постов по такому запросу нет..
        </p>
      )}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '30px',
          flexWrap: 'wrap',
          marginBottom: '20px',
        }}
      >
        {allFilter.map((post, idx) => (
          <PostItem key={idx} post={post} />
        ))}
      </div>
    </>
  )
}
