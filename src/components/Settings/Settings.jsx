import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActive, updateColumn } from "../../features/api/ApiSlice";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./Settings.css";

const Settings = () => {
	const dispatch = useDispatch();

	const [isOpen, setIsOpen] = useState(false);
	const columns = useSelector((state) => state.columns);
	const [newColumns, setNewColumns] = useState(columns);

	const toggle = () => {
		setIsOpen(!isOpen);
	};

	const handleColumnToggle = (result) => {
		const { source, destination } = result;
		newColumns.forEach((col) => {
			dispatch(setActive({ id: col.id, isActive: col.isActive }));
		});
		dispatch(updateColumn({ source, destination }));
		toggle();
	};

	const onDragEnd = (result) => {
		if (!result.destination) return;
		const newItems = Array.from(newColumns);
		const [reorderedItem] = newItems.splice(result.source.index, 1);
		newItems.splice(result.destination.index, 0, reorderedItem);
		setNewColumns(newItems);
		handleColumnToggle(result);
	};
	return (
		<>
			<div className="container">
				<div>
					<button onClick={toggle} className="settings-btn collapse">
						<i className="fa-solid fa-sliders"></i>Settings
					</button>
				</div>
			</div>
			{isOpen && (
				<div className="toggle">
					<h5>Dimensions and Metrics</h5>
					<DragDropContext onDragEnd={onDragEnd}>
						<Droppable droppableId="droppable">
							{(provided) => (
								<ul
									className="list"
									{...provided.droppableProps}
									ref={provided.innerRef}
								>
									{newColumns?.map((cols, index) => (
										<Draggable
											key={cols.id}
											draggableId={cols.id}
											index={index}
										>
											{(provided, snapshot) => (
												<li
													ref={provided.innerRef}
													snapshot={snapshot}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
													key={cols.id}
													className={`${
														cols.isActive
															? "btn-isActive"
															: "btn"
													}`}
													onClick={() => {
														setNewColumns(
															newColumns?.map(
																(col) => {
																	if (
																		col.id ===
																		cols.id
																	) {
																		return {
																			...col,
																			isActive:
																				!col.isActive,
																		};
																	}
																	return col;
																}
															)
														);
													}}
												>
													{cols.title}
												</li>
											)}
										</Draggable>
									))}
								</ul>
							)}
						</Droppable>
					</DragDropContext>
					<div className="action-btn">
						<button className="close-btn" onClick={toggle}>
							Close
						</button>
						<button
							className="submit-btn"
							onClick={handleColumnToggle}
						>
							Apply Changes
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default Settings;
