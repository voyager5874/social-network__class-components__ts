import React from 'react';

import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { ComponentReturnType } from 'types';

export const withRouter =
  (Component: typeof React.Component) =>
  (props: any): ComponentReturnType => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Component {...props} router={{ location, navigate, params }} />;
  };

export const withParams =
  (Component: typeof React.Component) =>
  (props: any): ComponentReturnType => {
    const params = useParams();
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Component {...props} params={params} />;
  };
