import React from 'react';
import './App.css';

import { Route, Routes } from 'react-router-dom';

import { Conversations } from 'components/conversations/Conversations';
import { Footer } from 'components/footer/Footer';
import { Header } from 'components/header/Header';
import { LeftSideBar } from 'components/LeftSideBar';
import { News } from 'components/news/News';
import { Profile } from 'components/profile/Profile';
import { Users } from 'components/users/Users';
import { UsersContainer } from 'components/users/UsersContainer';
import { ComponentReturnType } from 'types';

const App = (): ComponentReturnType => (
  <div className="appWrapper">
    <Header />
    <div className="pageCenter">
      <LeftSideBar />
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Profile />} />
        <Route path="/dialogs" element={<Conversations />} />
        <Route path="/users" element={<UsersContainer />} />
        <Route path="/news" element={<News />} />
      </Routes>
    </div>
    <Footer />
  </div>
);

export default App;
