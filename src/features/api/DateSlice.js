import { createSlice } from "@reduxjs/toolkit";

const startingDate = "2021-05-01";
const endingDate = "2021-05-31";

export const dateSlice = createSlice({
	name: "date",
	initialState: {
		startingDate,
		endingDate,
	},
	reducers: {
		setStartingDate: (state, action) => {
			state.startingDate = action.payload;
		},
		setEndingDate: (state, action) => {
			state.endingDate = action.payload;
		},
	},
});

export const { setStartingDate, setEndingDate } = dateSlice.actions;
export default dateSlice.reducer;
