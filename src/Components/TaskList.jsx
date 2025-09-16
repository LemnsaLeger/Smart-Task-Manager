import TaskItem from "./Taskitem";

const TaskList = ({openTask, tasks = []}) => {



  return (
    <>
      <div className="space-y-4 mt-3  rounded-xl">
        {tasks.map((task, index) => (
          <TaskItem
            key={index}
            title={task.title}
            dueDate={task.dueDate}
            tags={task.tags}
            onOpen={() => openTask(task)}
          />
        ))}
      </div>
    </>
  );
}

export default TaskList;