import React from 'react';
import { PropTypes } from 'prop-types';
import { FormControlLabel, Switch } from '@mui/material';

const CustomSwitch = ({
  wrapperClass,
  label,
  labelClass,
  value,
  errMsg = '',
  disabled,
  onChange = null,
  addonLeft,
  addonRight,
  name,
}) => {
  return (
    <div className={`relative ${wrapperClass} flex items-center gap-3`}>
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
          {addonLeft && addonLeft}
          <FormControlLabel
            disabled={disabled}
            control={
              <Switch
                name={name}
                checked={value}
                onChange={onChange}
                sx={{
                  '& .MuiSwitch-thumb': {
                    backgroundColor: '#FFA500',
                  },
                  '& .css-byenzh-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track':
                    {
                      background: '#FFA500',
                    },
                }}
              />
            }
          />
          {addonRight && addonRight}
        </div>
        {errMsg && <div className="error">{errMsg}</div>}
      </div>
    </div>
  );
};

CustomSwitch.propTypes = {
  wrapperClass: PropTypes.string,
  label: PropTypes.string,
  labelClass: PropTypes.string,
  inputType: PropTypes.string,
  value: PropTypes.string,
  errMsg: PropTypes.string,
  disabled: PropTypes.string,
  onChange: PropTypes.func,
  addonLeft: PropTypes.element,
  addonRight: PropTypes.element,
  name: PropTypes.string,
};

export default CustomSwitch;
