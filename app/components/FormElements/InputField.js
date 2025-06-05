import React from 'react';
import { PropTypes } from 'prop-types';

const InputField = ({
  wrapperClass,
  label,
  labelClass,
  inputType,
  inputClass,
  placeholder,
  value,
  errMsg = '',
  disabled,
  onChange,
  addonLeft,
  addonRight,
  name,
  required = false,
  readOnly = false,
}) => {
  return (
    <div className={`relative ${wrapperClass}`}>
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
          <input
            className={`input-box ${inputClass}`}
            type={inputType || 'text'}
            disabled={disabled || false}
            placeholder={placeholder || ''}
            name={name}
            onChange={onChange || null}
            value={value}
            min={0}
            required={required}
            readOnly={readOnly}
          />
          {addonRight && addonRight}
        </div>
        {errMsg ? <div className="error">{errMsg}</div> : ''}
      </div>
    </div>
  );
};

InputField.propTypes = {
  wrapperClass: PropTypes.string,
  label: PropTypes.string,
  labelClass: PropTypes.string,
  inputType: PropTypes.string,
  inputClass: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  errMsg: PropTypes.string,
  disabled: PropTypes.string,
  onChange: PropTypes.func,
  addonLeft: PropTypes.element,
  addonRight: PropTypes.element,
  name: PropTypes.string,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
};

export default InputField;
