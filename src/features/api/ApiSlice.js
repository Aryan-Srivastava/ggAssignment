import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// First API slice
export const reportApi = createApi({
	reducerPath: "report",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://go-dev.greedygame.com/v3/dummy/",
	}),
	endpoints: (builder) => ({
		getReport: builder.query({
			query: ({ startingDate, endingDate }) =>
				`report?startDate=${startingDate}&endDate=${endingDate}`,
		}),
	}),
});

export const { useGetReportQuery } = reportApi;

// Second API slice
export const appApi = createApi({
	reducerPath: "app",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://go-dev.greedygame.com/v3/dummy/",
	}),
	endpoints: (builder) => ({
		getApps: builder.query({
			query: () => "apps",
		}),
	}),
});

export const { useGetAppsQuery } = appApi;

const initialState = [
	{ id: "1", title: "Date", isActive: true },
	{ id: "2", title: "App", isActive: true },
	{ id: "3", title: "Ad Requests", isActive: true },
	{ id: "4", title: "Ad Response", isActive: true },
	{ id: "5", title: "Impressions", isActive: true },
	{ id: "6", title: "Clicks", isActive: true },
	{ id: "7", title: "Revenue", isActive: true },
	{ id: "8", title: "Fill Rate", isActive: true },
	{ id: "9", title: "CTR", isActive: true },
];

export const columnsSlice = createSlice({
	name: "columns",
	initialState,
	reducers: {
		setActive: (state, action) => {
			const { id, isActive } = action.payload;
			const index = state.findIndex((column) => column.id === id);
			if (index !== -1) {
				state[index].isActive = isActive;
			}
		},
		updateColumn: (state, action) => {
			const { source, destination } = action.payload;
			const [removed] = state.splice(source.index, 1);
			state.splice(destination.index, 0, removed);
		},
	},
});

export const { setActive, updateColumn } = columnsSlice.actions;
export default columnsSlice.reducer;
