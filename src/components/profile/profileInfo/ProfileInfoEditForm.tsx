import { ErrorMessage, Field, Form, Formik, useField } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import * as Yup from 'yup';

import styles from './ProfileInfoEditForm.module.css';

import { GetUserProfileResponseType, UserProfileContactsType } from 'api/types';
import { ErrorTag } from 'components/common';
import { UniversalButton } from 'components/common/universalButton/UniversalButton';
import { correctUrlRe } from 'constants/regExp';
import { updateCurrentUserProfile } from 'store/middlewares/userProfile';
import { RootStateType } from 'store/types';

const YesNoField = ({ children, ...props }: any) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <div className={styles.checkbox}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label>
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

const SocialMediaField = ({ children, ...props }: any) => {
  const [field, meta] = useField({ ...props, type: 'text' });
  return (
    <div className={styles.socialMediaFieldContainer}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className={styles.socialMediaFieldLabel}>{children}</label>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <input type="text" {...field} {...props} />
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
  contacts: UserProfileContactsType;
};

// type FormikErrorsObjectType = Partial<FormikInitialValuesType>;

export const ProfileInfoEditForm = () => {
  const dispatch = useDispatch();

  // eslint-disable-next-line no-undef
  const profileInfo = useSelector<RootStateType, GetUserProfileResponseType>(
    state => state.userProfile.profileData,
  );

  const socialMediaList = Object.keys(profileInfo.contacts);

  const FormikInitialValues: FormikInitialValuesType = {
    fullName: profileInfo.fullName || '',
    aboutMe: profileInfo.aboutMe || '',
    lookingForAJob:
      profileInfo.lookingForAJob !== null ? profileInfo.lookingForAJob : false,
    lookingForAJobDescription: profileInfo.lookingForAJobDescription || '',
    contacts: profileInfo.contacts,
  };
  return (
    <Formik
      validateOnChange={false}
      initialValues={FormikInitialValues}
      validationSchema={Yup.object({
        fullName: Yup.string().min(6, 'Must be at least 10 chars').required('Required'),
        aboutMe: Yup.string().max(200, 'Must be 200 characters or less'),
        lookingForAJob: Yup.boolean().oneOf(
          [true, false],
          'You must accept the terms and conditions.',
        ),
        lookingForAJobDescription: Yup.string()
          .max(200, 'Must be 200 characters or less')
          .min(20, 'Must be at least 20 chars long'),
        contacts: Yup.object().shape({
          github: Yup.string()
            .matches(correctUrlRe, 'Website should be a valid URL')
            .nullable(),
        }),
      })}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(updateCurrentUserProfile(values));
        setSubmitting(false);
      }}
    >
      {formik => (
        <Form className={styles.form}>
          <div className={styles.formBlock}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="fullName">Full name </label>
            <Field name="fullName" type="text" id="fullName" />
            <ErrorMessage name="fullName" component={ErrorTag} />
          </div>
          <div className={styles.formBlock}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="aboutMe">About me</label>
            {/* <Field as="textarea" name="aboutMe" type="text" className={styles.textarea} /> */}
            <TextareaAutosize
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...formik.getFieldProps('aboutMe')}
              className={styles.textarea}
            />
            <ErrorMessage name="aboutMe" component={ErrorTag} />
          </div>

          <YesNoField name="lookingForAJob">I am currently looking for a job</YesNoField>
          <div className={styles.formBlock}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="lookingForAJobDescription">Job description</label>
            {/* <Field */}
            {/*  as="textarea" */}
            {/*  name="lookingForAJobDescription" */}
            {/*  type="text" */}
            {/*  className={styles.textarea} */}
            {/* /> */}
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <TextareaAutosize
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...formik.getFieldProps('lookingForAJobDescription')}
              className={styles.textarea}
            />
            <ErrorMessage name="lookingForAJobDescription" component={ErrorTag} />
          </div>
          <div className={styles.socialMediaBlock}>
            <h3>My social media:</h3>

            {socialMediaList.map(media => (
              <SocialMediaField key={media} name={`contacts.${media}`}>
                <b>{media}</b>
              </SocialMediaField>
            ))}
          </div>

          <UniversalButton type="submit" disabled={formik.isSubmitting}>
            Save
          </UniversalButton>
        </Form>
      )}
    </Formik>
  );
};
