import './App.css';

import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { Login } from 'components';
import { LoadingVisualizer } from 'components/common/loadingVisualizer/LoadingVisualizer';
import { Conversations } from 'components/conversations/Conversations';
import { Footer } from 'components/footer/Footer';
import HeaderContainer from 'components/header/HeaderContainer';
import { LeftSideBar } from 'components/leftSideBar/LeftSideBar';
import { News } from 'components/news/News';
import UserProfileContainer from 'components/profile/ProfileContainer';
import UsersContainer from 'components/users/UsersContainer';
import { authCurrentUser } from 'store/middlewares/app';
import { RootStateType } from 'store/types';
import { ComponentReturnType } from 'types';

const App = (): ComponentReturnType => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authCurrentUser());
  }, []);

  const userLoggedIn = useSelector<RootStateType, boolean>(
    state => state.authData.isLoggedIn,
  );
  if (!userLoggedIn) return <LoadingVisualizer />;

  return (
    <div className="appWrapper">
      <HeaderContainer />
      <div className="pageCenter">
        <LeftSideBar />
        <Routes>
          <Route path="/profile" element={<UserProfileContainer />}>
            <Route path=":id" element={<UserProfileContainer />} />
          </Route>
          {/* <Route path="/profile/:id" element={<UserProfileContainer />} /> */}
          <Route path="/" element={<UserProfileContainer />} />
          <Route path="/dialogs" element={<Conversations />} />
          <Route path="/users" element={<UsersContainer />} />
          <Route path="/news" element={<News />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
