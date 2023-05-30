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
import '../App.css';

function App() {
  const [cities, setCities] = useState([])
  const [randomId, setRandomId] = useState(0)

  function updateCities(method, data) {
    switch (method) {
      case 'post city':
        setCities([...cities, data])
        break
      case 'delete city':
        setCities(cities.filter(city => city.id !== data.id))
        break
      case 'post post':
        setCities(cities.map(city => {
          if (city.id === data.city_id) {
            return {
              ...city,
              posts: [...city.posts, data]
            }
          }
          return city
        }))
        break
      case 'patch post':
        setCities(cities.map(city => {
          if (city.id === data.city_id) {
            return {
              ...city,
              posts: city.posts.map(post => post.id === data.id ? data : post)
            }
          }
          return city
        }))
        break
      case 'delete post':
        setCities(cities.map(city => {
          if (city.id === data.city_id) {
            return {
              ...city,
              posts: city.posts.filter(post => post.id !== data.id)
            }
          }
          return city
        }))
        break
      default:
        break
    }
  }

  function updateRandomId() {
    setRandomId(cities[Math.floor(Math.random() * cities.length)].id)
  }

  useEffect(() => {
    fetch('http://localhost:9292/cities')
    .then(r => r.json())
    .then(d => {
        setCities(d)
        setRandomId(d[Math.floor(Math.random() * d.length)].id)
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
          <CityList cities={cities} />
        } />
        <Route path='/cities/new' element={
          <NewCity onUpdateCities={updateCities} />
        } />
        <Route path='/cities/:city_id/posts' element={
          <PostList cities={cities} onUpdateCities={updateCities} />
        } />
        <Route path='/cities/:city_id/posts/new' element={
          <NewPost cities={cities} onUpdateCities={updateCities} />
        } />
        <Route path='/posts/:post_id' element={
          <PostDetail onUpdateCities={updateCities} />
        } />
        <Route path='/posts/:post_id/edit' element={
          <EditPost onUpdateCities={updateCities} />
        } />
        <Route path='*' element={<h1>404 Not Available</h1>} />
      </Routes>
    </div>
  );
}

export default App;
