import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import styles from './Login.module.css';

import { authCurrentUser } from 'store/middlewares/app';
import { login } from 'store/middlewares/login';
import { RootStateType } from 'store/types';
import { ComponentReturnType } from 'types';

type FormikErrorsObjectType = {
  email?: string;
  password?: string;
};

export const Login = (): ComponentReturnType => {
  const dispatch = useDispatch();
  const userIsLoggedIn = useSelector<RootStateType, boolean>(
    state => state.authData.isLoggedIn,
  );
  const MIN_PASSWORD_LENGTH = 4;

  const formik = useFormik({
    validate: values => {
      const errors: FormikErrorsObjectType = {};
      if (!values.email) {
        errors.email = 'email required';
      }
      if (values.password.length < MIN_PASSWORD_LENGTH) {
        errors.password = 'password is too short';
      }
      return errors;
    },
    initialValues: {
      email: process.env.REACT_APP_LOGIN || '',
      password: process.env.REACT_APP_PASSWORD || '',
      rememberMe: false,
    },
    onSubmit: values => {
      dispatch(login(values));
      // dispatch(authCurrentUser());
    },
  });

  if (userIsLoggedIn) return <Navigate replace to="/" />; // replace is to delete from history so "back" won't bring to login page

  return (
    <div className={styles.loginFormContainer}>
      <form onSubmit={formik.handleSubmit} className={styles.loginForm}>
        <div className={styles.inputContainer}>
          <label htmlFor="email" className={styles.inputLabel}>
            <span>Email Address</span>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
          </label>

          <div className={styles.errorText}>
            {formik.touched.email && formik.errors.email && formik.errors.email}
          </div>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="password" className={styles.inputLabel}>
            password
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
            />
          </label>

          <div className={styles.errorText}>
            {formik.touched.password && formik.errors.password && formik.errors.password}
          </div>
        </div>
        <div className={styles.checkboxContainer}>
          <label htmlFor="rememberMe" className={styles.checkboxLabel}>
            Remember me
            <input
              id="rememberMe"
              type="checkbox"
              onChange={formik.handleChange}
              checked={formik.values.rememberMe}
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={Boolean(formik.errors.password) || Boolean(formik.errors.email)}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
