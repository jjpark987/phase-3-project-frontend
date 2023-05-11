import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import CityList from './CityList';
import PostList from './PostList';
import NewPost from './NewPost';
import PostDetail from './PostDetail';
import EditPost from './EditPost';

function App() {
  const [cities, setCities] = useState([])

  useEffect(() => {
    fetch("http://localhost:9292/cities")
    .then(r => r.json())
    .then(d => {
        setCities(d)
    })
    .catch(e => console.log(e))
  }, [])

  return (
    <div id='app'>
      <NavBar cities={cities} />
      <Routes>
        <Route 
          path='/' 
          element={<Home />} 
        />
        <Route 
          path='/cities' 
          element={<CityList cities={cities} />} 
        />
        <Route 
          path='/cities/:city_id/posts' 
          element={<PostList />} 
        />
        <Route 
          exact path='/cities/:city_id/posts/:post_id' 
          element={<PostDetail />} 
        />
        <Route 
          path='/cities/:city_id/posts/new' 
          element={<NewPost />} 
        />
        <Route 
          path='/cities/:city_id/posts/:post_id/edit' 
          element={<EditPost />} 
        />
        <Route path='*' element={<h1>404 Not Available</h1>} />
      </Routes>
    </div>
  );
}

export default App;
