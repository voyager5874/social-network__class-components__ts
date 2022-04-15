import './App.css';

import { useLayoutEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Login } from 'components';
import { LoadingVisualizer } from 'components/common/loadingVisualizer/LoadingVisualizer';
import { Dialogs } from 'components/dialogs/Dialogs';
import { Friends } from 'components/friends/Friends';
import HeaderContainer from 'components/header/HeaderContainer';
import { LeftSideBar } from 'components/leftSideBar/LeftSideBar';
import { News } from 'components/news/News';
import { NotFound } from 'components/notFound/NotFound';
import UserProfileContainer from 'components/profile/ProfileContainer';
import UsersContainer from 'components/users/UsersContainer';
import { initializeApp } from 'store/middlewares/app';
import { RootStateType } from 'store/types';
import { ComponentReturnType, Nullable } from 'types';

const App = (): ComponentReturnType => {
  const dispatch = useDispatch();

  const userLoggedIn = useSelector<RootStateType, boolean>(
    state => state.authData.isLoggedIn,
  );
  const profileID = useSelector<RootStateType, Nullable<number>>(
    state => state.userProfile.profileData.userId,
  );

  const appIsInitialized = useSelector<RootStateType, boolean>(
    state => state.app.isInitialized,
  );

  // eslint-disable-next-line no-console
  console.log(
    `app rendering, login status (isLoggedIn state variable): ${userLoggedIn} , user id set in profile store part is ${profileID}`,
  );

  // useEffect(() => {
  //   dispatch(initializeApp());
  // }, [userLoggedIn]); // if this dependency not set user name won't appear in the header
  // right after login alternatively authMe (initializeApp[TC]) request can be done in login(TC)

  useLayoutEffect(() => {
    dispatch(initializeApp());
  }, []);

  return !appIsInitialized ? (
    <LoadingVisualizer />
  ) : (
    <div className="appWrapper">
      <HeaderContainer />
      <div className="content">
        <LeftSideBar />
        <Routes>
          <Route path="/profile" element={<UserProfileContainer />}>
            <Route path=":id" element={<UserProfileContainer />} />
          </Route>
          {/* <Route path="/profile/:id" element={<UserProfileContainer />} /> */}
          <Route path="/friends" element={<Friends />} />
          <Route path="/" element={<Navigate to="/profile" />} />
          <Route path="/dialogs" element={<Dialogs />}>
            <Route path=":interlocutorID" element={Dialogs} />
          </Route>

          <Route path="/users" element={<UsersContainer />} />
          <Route path="/news" element={<News />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
