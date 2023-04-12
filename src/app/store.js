import { configureStore } from "@reduxjs/toolkit";
import { reportApi, appApi } from "../features/api/ApiSlice";
import columnsReducer from "../features/api/ApiSlice";
import dateReducer from "../features/api/DateSlice";

export const store = configureStore({
	reducer: {
		date: dateReducer,
		columns: columnsReducer,
		[reportApi.reducerPath]: reportApi.reducer,
		[appApi.reducerPath]: appApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(reportApi.middleware, appApi.middleware),
});
