import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepickerStyle.css";

/** Used for date selection on stream scheueling
 * @prop {Date} updateDate The date to set as default
 * @component
 * @category Frontend
 */
function StreamDatePicker(props) {
  const updateDate = props.updateDate;
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 30), 16)
  );

  /**
   * @brief handles date selection
   *
   * @param {*} date recieved from the caller, the new date
   */
  const onChangeHandler = (date) => {
    setStartDate(date);
    updateDate(date);
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={onChangeHandler}
      showTimeSelect
      dateFormat="MMMM d, yyyy h:mm:aa"
      timeIntervals={15}
    />
  );
}

export default StreamDatePicker;
