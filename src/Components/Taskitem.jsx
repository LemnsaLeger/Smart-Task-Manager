import { PenLine, Trash2 } from "lucide-react";

import Modal from "./Modal";


const TaskItem = ({ task, onOpen, setEditingTask, openModal, deleteTask }) => {
  const { taskTitle, dueDate, tags = [] } = task;

  const handleEditClick = (e) => {
    e.stopPropagation();
    setEditingTask(task);
    openModal();
  }
  return (
    <>
      <article
        key={taskTitle}
        className="glass-card p-4 flex items-center backdrop-blur bg-white/30 rounded shadow justify-between mt-4"
      >
        <div className="relative" onClick={() => onOpen(task)}>
          <h4 className="font-semibold text-lg text-black"> {taskTitle} </h4>
          <p className="text-gray-400 text-sm ">Due: {dueDate}</p>
        </div>
        <p className="flex items-center space-x-2 relative -bottom-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`bg-black text-white text-[0.5em] font-semibold p-1 rounded-xl text-center`}
            >
              {tag}
            </span>
          ))}
        </p>
        <p className="absolute stroke-1 flex gap-2 top-0 right-3">
          <PenLine
            size={20}
            className="cursor-pointer hover:stroke-blue-500"
            onClick={handleEditClick}
          />
          <Trash2
            size={20}
            className="cursor-pointer hover:stroke-red-500"
            onClick={(e) => {
              e.stopPropagation();
              deleteTask(task.id);
            }}
          />
        </p>
      </article>
    </>
  );
};

export default TaskItem;