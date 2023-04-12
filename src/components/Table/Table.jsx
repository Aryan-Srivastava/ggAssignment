import React, { useState, useEffect } from "react";
import {
	useGetReportQuery,
	useGetAppsQuery,
} from "../../features/api/ApiSlice";
import { useSelector } from "react-redux";
import "./Table.css";

const Main = () => {
	const columns = useSelector((state) => state.columns);
	const startingDate = useSelector((state) => state.date.startingDate);
	const endingDate = useSelector((state) => state.date.endingDate);
	const { data: apiData, isLoading: apiLoading } = useGetReportQuery({
		startingDate: startingDate,
		endingDate: endingDate,
	});

	const { data: appData, isLoading: appLoading } = useGetAppsQuery();

	const [apiRes, setApiRes] = useState([]);
	const [appNames, setAppNames] = useState({});

	useEffect(() => {
		if (!apiLoading && !appLoading) {
			const apiResData = apiData?.data?.map((item) => {
				return {
					...item,
					date: item?.date?.slice(0, 10),
					revenue: item?.revenue?.toFixed(2),
					fill_rate: ((item?.requests / item?.responses) * 100)?.toFixed(
						2
					),
					ctr: ((item?.clicks / item?.impressions) * 100)?.toFixed(2),
				};
			});
			setApiRes(apiResData);
		}
	}, [apiData, apiLoading, appLoading]);

	useEffect(() => {
		if (!apiLoading && !appLoading) {
			const appNamesData = appData.data.reduce((obj, item) => {
				obj[item.app_id] = item.app_name;
				return obj;
			}, {});
			setAppNames(appNamesData);
		}
	}, [appData, apiLoading, appLoading]);

	return (
		<div className="table-container">
			<table>
				<thead>
					<tr>
						{columns &&
							columns.map((column) => {
								return (
									column.isActive && (
										<th key={column.id}>
											<i className="fa-solid fa-filter"></i>
											<p>{column.title}</p>
										</th>
									)
								);
							})}
					</tr>
				</thead>
				<tbody>
					{apiRes &&
						apiRes.map((item, index) => (
							<tr key={index}>
								{columns &&
									columns.map((column) => {
										return (
											column.isActive && (
												<td key={column.id}>
													{column.title === "Date"
														? item.date
														: column.title === "App"
														? appNames[item.app_id]
														: column.title ===
														  "Ad Requests"
														? item.requests
														: column.title ===
														  "Ad Response"
														? item.responses
														: column.title ===
														  "Impressions"
														? item.impressions
														: column.title ===
														  "Clicks"
														? item.clicks
														: column.title ===
														  "Revenue"
														? `$${item.revenue}`
														: column.title ===
														  "Fill Rate"
														? `${item.fill_rate}%`
														: column.title === "CTR"
														? `${item.ctr}%`
														: null}
												</td>
											)
										);
									})}
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
};

export default Main;
