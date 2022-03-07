import React from 'react';
import './App.css';

import { Route, Routes } from 'react-router-dom';

import { Conversations } from 'components/conversations/Conversations';
import { Dialog } from 'components/dialogs/dialog/Dialog';
import { Dialogs } from 'components/dialogs/Dialogs';
import { Footer } from 'components/footer/Footer';
import { Header } from 'components/header/Header';
import { LeftSideBar } from 'components/LeftSideBar';
import { News } from 'components/news/News';
import { Profile } from 'components/profile/Profile';
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

        <Route path="/news" element={<News />} />
      </Routes>
    </div>
    <Footer />
  </div>
);

export default App;
