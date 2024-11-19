import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { TbDots } from "react-icons/tb";
import { TaskMenu } from "./PopUp";
import { PiCheckSquare, PiSquare } from "react-icons/pi";
import { getMonthDate } from "../utils/generateDate";
import { useDispatch } from "react-redux";
import { setTaskMId } from "../redux/slices/stateSlice";

const TaskBox = ({
	backlogCollapse,
	todoCollapse,
	progressCollapse,
	doneCollapse,
	task,
	taskName,
}) => {
	const [collapse, setCollapse] = useState(true);
	const [taskMenuP, setTaskMenuP] = useState(false);
	const dispatch = useDispatch();
	const handleClickOutside = (event) => {
		if (taskMenuP && !event?.target.closest(".popup-box")) {
			setTaskMenuP(false);
		}
	};
	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [taskMenuP]);

	useEffect(() => {
		setCollapse(true);
	}, [backlogCollapse, todoCollapse, progressCollapse, doneCollapse]);
	return (
		<div className="task-box">
			<div className="priority-menu">
				<div>
					<div className="circle-box"></div>
					<p>{task?.priority}</p>
					<div className="circle-name-box">AK</div>
				</div>
				<div className="relative">
					<TbDots
						fontSize={18}
						cursor={"pointer"}
						onClick={() => {
							setTaskMenuP(true);
							dispatch(setTaskMId(task?._id));
						}}
					/>
					{taskMenuP && (
						<TaskMenu setTaskMenuP={setTaskMenuP} id={task?._id} />
					)}
				</div>
			</div>
			<h3 title="Hero Section">{task?.title}</h3>
			<div className="task-checklist">
				<p>
					Checklist (
					{
						task?.checklist.filter((list) => list.isDone == true)
							.length
					}
					/{task?.checklist.length})
				</p>
				<div onClick={() => setCollapse(!collapse)}>
					{collapse ? <IoIosArrowDown /> : <IoIosArrowUp />}
				</div>
			</div>
			<div
				className={`task-checklist-details ${
					collapse && "task-checklist-details-collapse"
				}`}
			>
				{task?.checklist.map((list, idx) => {
					return (
						<label
							key={idx + "checklist-box"}
							className="checklist-details-box"
							htmlFor="task1"
						>
							{!list.isDone ? (
								<PiSquare fontSize={18} />
							) : (
								<PiCheckSquare fontSize={18} />
							)}
							<span>{list.name}</span>
						</label>
					);
				})}
			</div>
			<div className="task-btns">
				{task?.dueDate ? (
					<div
						className={`task-btn task-btn-red ${
							taskName == "done" && "task-btn-green"
						}`}
					>
						{getMonthDate(task?.dueDate)}
					</div>
				) : (
					<div></div>
				)}
				<div>
					{taskName != "backlog" && (
						<div className="task-btn">BACKLOG</div>
					)}
					{taskName != "todo" && (
						<div className="task-btn">TO-DO</div>
					)}
					{taskName != "inProgress" && (
						<div className="task-btn">PROGRESS</div>
					)}
					{taskName != "done" && <div className="task-btn">DONE</div>}
				</div>
			</div>
		</div>
	);
};

export default TaskBox;
