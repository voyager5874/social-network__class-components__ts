import './App.css';

import { Route, Routes } from 'react-router-dom';

import { Conversations } from 'components/conversations/Conversations';
import { Footer } from 'components/footer/Footer';
import HeaderContainer from 'components/header/HeaderContainer';
import { LeftSideBar } from 'components/LeftSideBar';
import { News } from 'components/news/News';
import UserProfileContainer from 'components/profile/ProfileContainer';
import { UsersContainer } from 'components/users/UsersContainer';
import { ComponentReturnType } from 'types';

const App = (): ComponentReturnType => (
  <div className="appWrapper">
    <HeaderContainer />
    <div className="pageCenter">
      <LeftSideBar />
      <Routes>
        <Route path="/profile/:id" element={<UserProfileContainer />} />
        <Route path="/" element={<UserProfileContainer />} />
        <Route path="/dialogs" element={<Conversations />} />
        <Route path="/users" element={<UsersContainer />} />
        <Route path="/news" element={<News />} />
      </Routes>
    </div>
    <Footer />
  </div>
);

export default App;
