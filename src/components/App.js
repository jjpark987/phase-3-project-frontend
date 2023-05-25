import React, { useCallback, useEffect, useState } from 'react';
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
  const [allCities, setAllCities] = useState([])
  const [city, setCity] = useState(null)
  const [randomId, setRandomId] = useState(0)
  const updateCity = useCallback(city_id => setCity(allCities.find(city => city.id === parseInt(city_id))), [allCities])

  function updateAllCities(method, targetCity) {
    switch (method) {
      case 'post':
        setAllCities([ ...allCities, targetCity ])
        break
      case 'delete':
        setAllCities(allCities.filter(city => city.id !== targetCity.id))
        break
      default:
        break
    }
  }

  function updateRandomId() {
    setRandomId(allCities[Math.floor(Math.random() * allCities.length)].id)
  }

  useEffect(() => {
    fetch('http://localhost:9292/cities')
    .then(r => r.json())
    .then(d => {
        setAllCities(d)
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
          <CityList allCities={allCities} />
        } />
        <Route path='/cities/new' element={
          <NewCity onUpdateAllCities={updateAllCities} />
        } />
        <Route path='/cities/:city_id/posts' element={
          <PostList 
            city={city} 
            onUpdateCity={updateCity} 
            onUpdateAllCities={updateAllCities} 
          />
        } />
        <Route path='/cities/:city_id/posts/new' element={
          <NewPost city={city} onUpdateCity={updateCity} />
        } />
        <Route path='/posts/:post_id' element={
          <PostDetail />
        } />
        <Route path='/posts/:post_id/edit' element={
          <EditPost />
        } />
        <Route path='*' element={<h1>404 Not Available</h1>} />
      </Routes>
    </div>
  );
}

export default App;
