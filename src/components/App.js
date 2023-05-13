import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import CityList from './CityList';
import PostList from './PostList';
import PostDetail from './PostDetail';
import NewCity from './NewCity';
import NewPost from './NewPost';
import EditPost from './EditPost';

function App() {
  const [cities, setCities] = useState([])
  const [posts, setPosts] = useState([])
  const [randomId, setRandomId] = useState(0)

  function updateCities(method, targetCity) {
    switch (method) {
      case 'post':
        setCities([ ...cities, targetCity ])
        break
      case 'delete':
        setCities(cities.filter(city => city.id !== targetCity.id))
        break
      default:
        break
    }
  }

  function initializePosts(initialPosts) {
    setPosts(initialPosts)
  }

  function updatePosts(method, targetPost) {
    switch (method) {
      case 'post':
        setPosts([ ...posts, targetPost ])
        break
      case 'patch':
        setPosts(posts.map(post => {
          if (post.id === targetPost.id) {
            return {
              ...post,
              category: targetPost.category,
              title: targetPost.title,
              body: targetPost.body
            }
          }
          return post
        }))
        break
      case 'delete':
        setPosts(posts.filter(post => post.id !== targetPost.id))
        break
      default:
        break
    }
  }

  function updateRandomId() {
    const randomIndex = Math.floor(Math.random() * cities.length)
    setRandomId(cities[randomIndex].id)
  }

  useEffect(() => {
    fetch('http://localhost:9292/cities')
    .then(r => r.json())
    .then(d => {
        setCities(d)
    })
    .catch(e => console.log(e))
  }, [])

  return (
    <div id='app'>
      <NavBar randomId={randomId} onUpdateRandomId={updateRandomId} />
      <Routes>
        <Route path='/' element={
          <Home />
        } />
        <Route path='/cities' element={
          <CityList cities={cities} onUpdateCities={updateCities} />
        } />
        <Route path='/cities/:city_id/posts' element={
          <PostList posts={posts} onInitializePosts={initializePosts} />
        } />
        <Route path='/cities/:city_id/posts/:post_id' element={
          <PostDetail onUpdatePosts={updatePosts} />
        } />
        <Route path='/cities/new' element={
          <NewCity onUpdateCities={updateCities} />
        } />
        <Route path='/cities/:city_id/posts/new' element={
          <NewPost cities={cities} onUpdatePosts={updatePosts} />
        } />
        <Route path='/cities/:city_id/posts/:post_id/edit' element={
          <EditPost onUpdatePosts={updatePosts} />
        } />
        <Route path='*' element={<h1>404 Not Available</h1>} />
      </Routes>
    </div>
  );
}

export default App;
