import React from 'react';
import DateTimePicker from 'react-datepicker';
import { PropTypes } from 'prop-types';
// import { reactIcons } from '@/utils/icons';

const CustomDateTimePicker = ({
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
}) => {
  return (
    <>
      {/* <DateTimePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="DD/MM/YYYY hh:mm:a"
        showTimeSelect
        timeIntervals={15}
        timeFormat="hh:mm:a"
      /> */}

      <div className={`relative custom-date-time ${wrapperClass}`}>
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
            <DateTimePicker
              className={`input-box !pr-9 ${inputClass}`}
              type={inputType || 'text'}
              disabled={disabled || false}
              placeholderText={placeholder || ''}
              name={name}
              //   onChange={onChange || null}
              //   value={value}
              min={0}
              required={required}
              selected={value}
              onChange={onChange || null}
              dateFormat="dd/MM/YYYY hh:mm:a"
              showTimeSelect
              timeIntervals={5}
              timeFormat="hh:mm:a"
              highlightDates={new Date()}
              autoComplete="off"
            />
            {/* <span className="absolute top-[10px] right-2 text-20 cursor-pointer">
              {reactIcons.calender}
            </span> */}
            {addonRight && addonRight}
          </div>
          {errMsg ? <div className="error">{errMsg}</div> : ''}
        </div>
      </div>
    </>
  );
};

CustomDateTimePicker.propTypes = {
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
};

export default CustomDateTimePicker;
