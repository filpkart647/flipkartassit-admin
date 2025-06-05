import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import InputField from '../FormElements/InputField';
import { reactIcons } from '@/utils/icons';
import { PropTypes } from 'prop-types';

const EditUserModal = ({ openModal, closeModal }) => {
  const [isLoading] = useState(false);
  const handleClose = () => {
    closeModal(false);
  };
  return (
    <>
      <Dialog fullWidth maxWidth="sm" open={openModal} scroll="paper">
        <DialogTitle sx={{ position: 'relative', paddingBottom: 0 }}>
          Edit User
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
              <div className="input-field mb-3">
                <InputField
                  name="name"
                  label="Name"
                  placeholder="Enter Name"
                  inputClass="text-black"
                />
              </div>
              <div className="input-field">
                <InputField
                  name="mobile"
                  type="number"
                  label="Mobile No."
                  placeholder="Enter Mobile number"
                  inputClass="text-black"
                />
              </div>
            </form>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ paddingX: 3, paddingTop: 0, paddingBottom: 2 }}>
          <div className="flex items-center gap-3">
            <button
              type="submit"
              // onClick={submitHandler}
              className={`text-white font-medium py-2 px-5 rounded-md text-14 bg-primary-1200 font-comfortaa w-full flex items-center gap-3 ${
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
        </DialogActions>
      </Dialog>
    </>
  );
};

EditUserModal.propTypes = {
  openModal: PropTypes.bool,
  closeModal: PropTypes.func,
};

export default EditUserModal;
