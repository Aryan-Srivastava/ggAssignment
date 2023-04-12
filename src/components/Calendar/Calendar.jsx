import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Calendar.css";
import { useDispatch } from "react-redux";
import { setStartingDate, setEndingDate } from "../../features/api/DateSlice"

const Calendar = () => {
	const dispatch = useDispatch();

	const [startDate, setStartDate] = useState(new Date("2021-05-01"));
	const [endDate, setEndDate] = useState(new Date("2021-05-04"));

	const handleStartDateChange = (date) => {
		let updatedDate = date.toISOString().slice(0, 10);
		setStartDate(date);
		dispatch(setStartingDate(updatedDate));
	};

	const handleEndDateChange = (date) => {
		let updatedDate = date.toISOString().slice(0, 10);
		setEndDate(date);
		dispatch(setEndingDate(updatedDate));
	};
	return (
		<>
			<DatePicker
				selected={startDate}
				onChange={handleStartDateChange}
				selectsStart
				startDate={startDate}
				endDate={endDate}
				maxDate={endDate}
			/>
			<DatePicker
				selected={endDate}
				onChange={handleEndDateChange}
				selectsEnd
				startDate={startDate}
				endDate={endDate}
				minDate={startDate}
			/>
		</>
	);
};

export default Calendar;
