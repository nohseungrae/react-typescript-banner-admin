import React, { SyntheticEvent } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface IProps {
  startDate?: Date;
  setStartDate: (
    date: Date | null,
    event: SyntheticEvent<Event> | undefined
  ) => void;
  endDate?: Date;
  setEndDate: (
    date: Date | null,
    event: SyntheticEvent<Event> | undefined
  ) => void;
}

export const DateRange: React.FunctionComponent<IProps> = (props) => {
  return (
    <>
      <DatePicker
        selected={props.startDate}
        onChange={props.setStartDate}
        selectsStart={true}
        startDate={props.startDate}
        endDate={props.endDate}
        dateFormat="yyyy-MM-dd"
        placeholderText="Start Date"
        dateFormatCalendar="yyyy LLLL"
        className="first"
      />
      <DatePicker
        selected={props.endDate}
        onChange={props.setEndDate}
        selectsEnd={true}
        startDate={props.startDate}
        endDate={props.endDate}
        minDate={props.startDate}
        dateFormat="yyyy-MM-dd"
        placeholderText="End Date"
        dateFormatCalendar="yyyy LLLL"
        className="second"
      />
    </>
  );
};
