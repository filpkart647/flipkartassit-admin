import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import { reactIcons } from '@/utils/icons';
import { PropTypes } from 'prop-types';
import { isYupError, parseYupError } from '@/utils/Yup';
import toast from 'react-hot-toast';
import { createUserValidation, validateData } from '@/utils/validation';
import { postReq } from '@/utils/apiHandlers';

const CreateUserModal = ({ openModal, closeModal, getUserData }) => {
  const handleClose = () => {
    closeModal(false);
  };
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [formError, setFormError] = useState({});
  const [setLock, isSetLock] = useState();
  const lockFunction = () => {
    isSetLock(!setLock);
  };
  console.log(form);
  // Login API Calling
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setFormError({ ...formError, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const [, ValidationErr] = await validateData(createUserValidation, form);
      if (ValidationErr) {
        setFormError(ValidationErr);
        return;
      }

      const res = await postReq('/user/users', form);
      const { status, error, data } = res;
      console.log(data);
      if (status) {
        toast.success(data.message);
        setForm({});
        getUserData();
        handleClose();
      } else if (error) {
        console.log(error, 'error in create user');
        Array.isArray(error)
          ? error?.map((msg) => toast.error(msg))
          : toast.error(error);
      }
    } catch (error) {
      if (isYupError(error)) {
        setFormError(parseYupError(error));
      } else {
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Dialog fullWidth maxWidth="sm" open={openModal} scroll="paper">
        <DialogTitle sx={{ position: 'relative', paddingBottom: 0 }}>
          <p className="text-2xl font-semibold"> Create User</p>
        </DialogTitle>
        <span
          className="absolute top-5 right-6 z-30 text-20 cursor-pointer"
          onClick={handleClose}
        >
          {reactIcons.close}
        </span>
        <DialogContent>
          <DialogContentText>
            <form>
              <div className="w-full py-5 px-4  ">
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label htmlFor="username">Username</label>
                    <input
                      className="input-box"
                      type="text"
                      id="username"
                      placeholder="Enter Username"
                      name="username"
                      onChange={handleChange}
                    />
                    <div className="error">
                      {formError.username && (
                        <div className="form-eror">{formError.username}</div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email">Email</label>
                    <input
                      className="input-box"
                      type="text"
                      id="email"
                      placeholder="Enter your Email"
                      name="email"
                      onChange={handleChange}
                    />
                    <div className="error">
                      {formError.email && (
                        <div className="form-eror">{formError.email}</div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="Password">Password</label>
                    <div className="relative">
                      <input
                        className="input-box"
                        type={setLock ? 'text' : 'password'}
                        id="Password"
                        placeholder="Enter your password"
                        name="password"
                        onChange={handleChange}
                      />
                      <span
                        onClick={lockFunction}
                        className="cursor-pointer absolute top-2 z-10 right-6 text-26 text-black"
                      >
                        {setLock ? reactIcons.eye : reactIcons.eyesplash}
                      </span>
                    </div>
                    <div className="error">
                      {formError.password && (
                        <div className="form-eror">{formError.password}</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-7">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className={`text-white font-medium py-2  px-10 rounded-md text-14 bg-primary-1200 font-comfortaa  flex items-center gap-3 ${
                      isLoading && 'opacity-50'
                    }`}
                    disabled={isLoading}
                  >
                    Submit{' '}
                    {isLoading && (
                      <span className="animate-spin text-20">
                        {reactIcons.spinLoader}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

CreateUserModal.propTypes = {
  openModal: PropTypes.bool,
  closeModal: PropTypes.func,
  getUserData: PropTypes.func,
};

export default CreateUserModal;
