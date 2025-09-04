import TaskItem from "./Taskitem";

const TaskList = () => {
  // Dummy task data
  const tasks = [
    {
      title: "Design Landing Page",
      dueDate: "Tomorrow",
      tags: ["UI/UX", "High Priority"],
    },
    {
      title: "Build API Endpoints",
      dueDate: "Friday",
      tags: ["Back-End", "Medium Priority"],
    },
  ];
  return (
    <>
      <div className="space-y-4 mt-3  rounded-xl">
        {tasks.map((task, index) => (
          <TaskItem
            key={index}
            title={task.title}
            dueDate={task.dueDate}
            tags={task.tags}
          />
        ))}
      </div>
    </>
  );
}

export default TaskList;