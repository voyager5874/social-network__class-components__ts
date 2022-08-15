import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import * as Yup from 'yup';

import styles from './Login.module.css';

import { LoginDataType } from 'api/types';
import { ErrorTag } from 'components/common';
import { UniversalButton } from 'components/common/universalButton/UniversalButton';
import { login } from 'store/middlewares/login';
import { RootStateType } from 'store/types';
import { ComponentReturnType, Nullable } from 'types';

const initialValues: LoginDataType = {
  email: process.env.REACT_APP_LOGIN || 'free@samuraijs.com',
  password: process.env.REACT_APP_PASSWORD || 'free',
  rememberMe: false,
  captcha: '',
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

  const captcha = useSelector<RootStateType, Nullable<string>>(
    state => state.authData.captcha,
  );

  const onSubmit = (values: LoginDataType, actions: FormikHelpers<LoginDataType>) => {
    dispatch(login(values, actions.setSubmitting, actions.setStatus));
  };

  if (userIsLoggedIn) return <Navigate replace to="/" />; // replace is to delete from history so "back" won't bring to login page

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {formik => (
        <Form className={styles.loginFormContainer}>
          <div className={styles.loginForm}>
            <p>
              sign up on <a href="https://social-network.samuraijs.com/">samuraiJS</a>
            </p>
            <p>or use the default credentials</p>
            <p>Email: free@samuraijs.com, Password: free</p>
            <div className={styles.formStatus}>
              {formik.status && <ErrorTag>{formik.status}</ErrorTag>}
            </div>
            <div className={styles.inputContainer}>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="email" className={styles.inputLabel}>
                <span>email</span>
                <Field id="email" name="email" />
              </label>
              <ErrorMessage name="email">
                {error => <div className={styles.errorText}>{error}</div>}
              </ErrorMessage>
            </div>

            <div className={styles.inputContainer}>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="password" className={styles.inputLabel}>
                <span>password</span>
                <Field id="password" name="password" type="password" />
              </label>
              <ErrorMessage name="password" component={ErrorTag} />
            </div>
            <div className={styles.checkboxContainer}>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="rememberMe" className={styles.checkboxLabel}>
                <span>Remember me</span>
                <Field type="checkbox" id="rememberMe" name="rememberMe" />
              </label>
            </div>
            {captcha && <img src={captcha || ''} alt="captcha" />}
            {captcha && (
              <div className={styles.inputContainer}>
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="captcha" className={styles.inputLabel}>
                  captcha
                  <Field id="captcha" name="captcha" type="text" />
                </label>
              </div>
            )}
            <UniversalButton
              type="submit"
              disabled={formik.isSubmitting || !formik.isValid}
            >
              Submit
            </UniversalButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};
