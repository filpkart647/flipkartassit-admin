/* eslint-disable */
import { reactIcons } from '@/utils/icons';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateRange = ({ minDate, dateFormat, onChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const datePickerRef = useRef();

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    let checkdt = moment(end).add(1, 'd');
    setStartDate(start);
    setEndDate(end);
    onChange(
      moment(start).format('yyyy-MM-DD'),
      moment(checkdt._d).format('yyyy-MM-DD'),
    );
  };

  const clearHandler = () => {
    setStartDate(null);
    setEndDate(null);
    onChange(null, null);
  };

  return (
    <div className="flex">
      <div className="relative">
        <ReactDatePicker
          className="min-w-[250px]"
          selectsRange
          startDate={startDate}
          endDate={endDate}
          onChange={handleDateChange}
          minDate={minDate || null}
          dateFormat={dateFormat || 'dd/MM/yyyy'}
          placeholderText="Select date range"
          ref={datePickerRef}
        />
        <span
          className="absolute top-3 right-3 text-[#999] hover:text-black cursor-pointer"
          onClick={clearHandler}
        >
          {reactIcons.close}
        </span>
      </div>
    </div>
  );
};
export default DateRange;
