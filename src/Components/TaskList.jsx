import TaskItem from "./Taskitem";
import Button from "./Button";
import { ChevronLeftIcon, Plus } from "lucide-react";
const TaskList = ({
  tasks = [],
  openTask,
  setEditingTask,
  openModal,
  deleteTask,
  handleBackHome,
}) => {

  const handleOpenEditModal = () => {
    // this function makes sure we are opening the correct type
    openModal("task");
  }

  const handleOpenCreateModal = () => {
    setEditingTask(null);
    openModal("task");
  }
  return (
    <>
      <div className="space-y-4 mt-14  rounded-xl p-2 relative">
        <button
          onClick={handleOpenCreateModal}
          className="absolute right-0 -top-13 mt-4 mb-8 bg-gray-800 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-gray-700 transition-colors"
        >
          <Plus size={16} />
          Create New Task
        </button>
        {tasks.length === 0 ? (
          <>
            <p className="text-gray-700  fixed top-[20vh] left-20">
              No tasks created yet!
            </p>
          </>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onOpen={() => openTask(task)}
              setEditingTask={setEditingTask}
              openModal={handleOpenEditModal}
              deleteTask={deleteTask}
            />
          ))
        )}
        <button
          className="fixed top-[10vh] left-2 border p-2 rounded-2xl flex"
          onClick={() => handleBackHome()}
        >
          <ChevronLeftIcon />
          Back
        </button>
      </div>
    </>
  );
};

export default TaskList;