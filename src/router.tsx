import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Layout from './components/Layout';
import Search from './Pages/Search';
import Album from './components/Album';
import Favorites from './Pages/Favorites';
import Profile from './Pages/Profile';
import ProfileEdit from './Pages/ProfileEdit';
import NotFound from './Pages/NotFound';

function AppRouter() {
  return (

    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route element={ <Layout /> }>
        <Route path="/search" element={ <Search /> } />
        <Route path="/album/:id" element={ <Album /> } />
        <Route path="/favorites" element={ <Favorites /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/profile/edit" element={ <ProfileEdit /> } />
        <Route path="*" element={ <NotFound /> } />
      </Route>
    </Routes>

  );
}

export default AppRouter;
