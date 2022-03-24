import { ErrorMessage, Field, Form, Formik, useField } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import styles from './ProfileInfoEditForm.module.css';

import { GetUserProfileResponseType } from 'api/types';
import { updateCurrentUserProfile } from 'store/middlewares/userProfile';
import { RootStateType } from 'store/types';

const LookingForJob = ({ children, ...props }: any) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <div>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className={styles.checkbox}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className={styles.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

// const MySelect = ({ label, ...props }) => {
//   const [field, meta] = useField(props);
//   return (
//     <div>
//       <label htmlFor={props.id || props.name}>{label}</label>
//       <select {...field} {...props} />
//       {meta.touched && meta.error ? (
//         <div className="error">{meta.error}</div>
//       ) : null}
//     </div>
//   );
// };

// type FormikInitialValuesType = Omit<
//   GetUserProfileResponseType,
//   'userId' | 'photos' | 'contacts'
// >;

type FormikInitialValuesType = {
  fullName: string;
  aboutMe: string;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
};

// type FormikErrorsObjectType = Partial<FormikInitialValuesType>;

export const ProfileInfoEditForm = () => {
  const dispatch = useDispatch();

  // eslint-disable-next-line no-undef
  const profileInfo = useSelector<RootStateType, GetUserProfileResponseType>(
    state => state.userProfile.profileData,
  );
  const FormikInitialValues: FormikInitialValuesType = {
    fullName: profileInfo.fullName || '',
    aboutMe: profileInfo.aboutMe || '',
    lookingForAJob:
      profileInfo.lookingForAJob !== null ? profileInfo.lookingForAJob : false,
    lookingForAJobDescription: profileInfo.lookingForAJobDescription || '',
  };
  return (
    <Formik
      initialValues={FormikInitialValues}
      validationSchema={Yup.object({
        fullName: Yup.string().min(6, 'Must be at least 10 chars').required('Required'),
        aboutMe: Yup.string().max(200, 'Must be 200 characters or less'),
        lookingForAJob: Yup.boolean()
          .required('Required')
          .oneOf([true, false], 'You must accept the terms and conditions.'),
        lookingForAJobDescription: Yup.string().max(
          200,
          'Must be 200 characters or less',
        ),
      })}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(updateCurrentUserProfile(values));
        setSubmitting(false);
      }}
    >
      <Form className={styles.form}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="fullName">Full name</label>
        <Field name="fullName" type="text" />
        <ErrorMessage name="fullName" className={styles.error} />

        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="aboutMe">About me</label>
        <Field name="aboutMe" type="text" />
        <ErrorMessage name="aboutMe" className={styles.error} />

        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        {/* <label htmlFor="lookingForAJob">Job description</label> */}
        {/* <Field name="lookingForAJob" type="text" /> */}
        {/* <ErrorMessage name="lookingForAJob" /> */}

        <LookingForJob name="lookingForAJob">
          I am currently looking for a job
        </LookingForJob>

        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="lookingForAJobDescription">Job description</label>
        <Field name="lookingForAJobDescription" type="text" />
        <ErrorMessage name="lookingForAJobDescription" className={styles.error} />

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};
