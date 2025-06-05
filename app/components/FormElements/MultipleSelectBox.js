/* eslint-disable no-unused-vars */
import React from 'react';
import { PropTypes } from 'prop-types';
import { MenuItem, Select, TextField } from '@mui/material';

const MultipleSelectBox = ({
  wrapperClass,
  label,
  labelClass,
  placeholder,
  value,
  errMsg = '',
  disabled,
  handleChange = null,
  name,
  menus = [],
}) => {
  return (
    <div className={`relative ${wrapperClass} multi-dd`}>
      {label && (
        <label
          className={`input-label text-[#384D6C] mb-1 block capitalize ${labelClass}`}
          htmlFor=""
        >
          {label}
        </label>
      )}
      <div>
        <div className="relative">
          <TextField
            name={name}
            value={value}
            onChange={handleChange}
            select
            SelectProps={{ multiple: true }}
            size="small"
            placeholder={placeholder || 'Select'}
            fullWidth
          >
            {menus.map((item, ind) => (
              <MenuItem key={ind} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        {errMsg ? <div className="error">{errMsg}</div> : ''}
      </div>
    </div>
  );
};

MultipleSelectBox.propTypes = {
  wrapperClass: PropTypes.string,
  label: PropTypes.string,
  labelClass: PropTypes.string,
  inputClass: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  errMsg: PropTypes.string,
  disabled: PropTypes.string,
  handleChange: PropTypes.func,
  name: PropTypes.string,
  menus: PropTypes.array,
};

export default MultipleSelectBox;
