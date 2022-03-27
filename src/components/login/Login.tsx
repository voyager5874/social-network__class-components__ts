import { Form, Formik, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import * as Yup from 'yup';

import styles from './Login.module.css';

import { LoginDataType } from 'api/types';
import { ErrorTag } from 'components/common';
import { login } from 'store/middlewares/login';
import { RootStateType } from 'store/types';
import { ComponentReturnType } from 'types';

const initialValues: LoginDataType = {
  email: process.env.REACT_APP_LOGIN || '',
  password: process.env.REACT_APP_PASSWORD || '',
  rememberMe: false,
};

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Required'),
  password: Yup.string()
    .required('No password provided.')
    .min(4, 'Password is too short - should be 4 chars minimum.'),
});

export const Login = (): ComponentReturnType => {
  const dispatch = useDispatch();

  const userIsLoggedIn = useSelector<RootStateType, boolean>(
    state => state.authData.isLoggedIn,
  );

  const onSubmit = (values: LoginDataType) => {
    dispatch(login(values));
  };

  if (userIsLoggedIn) return <Navigate replace to="/" />; // replace is to delete from history so "back" won't bring to login page

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form className={styles.loginFormContainer}>
        <div className={styles.loginForm}>
          <div className={styles.inputContainer}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="email" className={styles.inputLabel}>
              <span>Email Address</span>
              <Field id="email" name="email" />
            </label>
            <ErrorMessage name="email">
              {error => <div className={styles.errorText}>{error}</div>}
            </ErrorMessage>
          </div>

          <div className={styles.inputContainer}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="password" className={styles.inputLabel}>
              password
              <Field id="password" name="password" type="password" />
            </label>
            <ErrorMessage name="password" component={ErrorTag} />
          </div>
          <div className={styles.checkboxContainer}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="rememberMe" className={styles.checkboxLabel}>
              Remember me
              <Field type="checkbox" id="rememberMe" name="rememberMe" />
            </label>
          </div>
          <button
            type="submit"
            // disabled={
            //   formik.isSubmitting
            //   Boolean(Formik.errors.password) ||
            //   Boolean(formik.errors.email) ||
            // }
          >
            Submit
          </button>
        </div>
      </Form>
    </Formik>
  );
};
