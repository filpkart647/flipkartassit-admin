import * as Yup from 'yup';
import { isYupError, parseYupError } from '@/utils/Yup';

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{3,3}$/i;
const passwordRegex =
  /^(?=.*[A-Z])(?=.*[~!@#$%^&*()/_=+[\]{}|;:,.<>?-])(?=.*[0-9])(?=.*[a-z]).{8,40}$/;

export const validateData = async (schema, inputData) => {
  return await schema
    .validate(inputData, {
      abortEarly: false,
    })
    .then(() => [true, null])
    .catch((err) => {
      if (isYupError(err)) {
        return [false, parseYupError(err)];
      }
      return [false, null];
    });
};

// Login Validation
export const signInValidationSchema = Yup.object({
  username: Yup.string().required('Email is required'),
  password: Yup.string().required('Password is required'),
});
export const createUserValidation = Yup.object({
  email: Yup.string()
    .matches(emailRegex, 'Please enter valid email')
    .required('Email is required'),
  username: Yup.string().required('Username is required'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      passwordRegex,
      'Only accept One Uppercase and atleast one special characters and numbers',
    ),
});
export const validateForm = Yup.object().shape({
  employeeId: Yup.string().required('Employee ID is required'),
  businessName: Yup.string().required('Business Name is required'),
  address: Yup.string().required('Address is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  pinCode: Yup.number()
    .typeError('Pin code must be a number')
    .required('Pincode is required'),
  whatsappNumber: Yup.string()
    .matches(/^\+?[0-9]+$/, 'Whatsapp Number must be digits.')
    .required('Whatsapp Number is required'),
  phoneNumber: Yup.string()
    .matches(/^\+?[0-9]+$/, 'Phone Number must be digits.')
    .required('Phone Number is required'),
  gstNumber: Yup.string().required('GST Number is required'),
  yearOfEstablishment: Yup.number()
    .typeError('Year must be a number')
    .required('Year of Establishment is required'),
  rating: Yup.number()
    .typeError('Rating must be a number')
    .required('Rating is required'),
  sourcesLink: Yup.string().required('Link is required'),
  sourcesPlatform: Yup.string().required('Sources Platform is required'),
  employeeName: Yup.string().required('Name is required'),
  employeeMobileNumber: Yup.string()
    .matches(/^\+?[0-9]+$/, 'Mobile Number must be digits.')
    .required('Mobile Number is required'),
});
