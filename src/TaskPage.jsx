// import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Plus, ChevronLeft, User } from "lucide-react";

const TodaysTasks = ({ handleBackHome, tasksFromDB = [] }) => {
  const today = new Date().toISOString().split("T")[0];
  const [tasks, setTasks] = useState(tasksFromDB);
  const [numberOfDays, setNumberOfDays] = useState();
  const presentMonth = new Date().getMonth() + 1;

 useEffect(() => {
    const dayCount = () => {
      setNumberOfDays(
        new Date(new Date().getFullYear(), presentMonth, 0).getDate()
      );
    };

    dayCount();
 }, [presentMonth]);

  const days = Array.from({length: numberOfDays}, (_, i) => i + 1); // array of 1 - total number of days in a month

  useEffect(() => {
    const todayTasks = tasksFromDB.filter((t) => t.dueDate === today);
    const otherTasks = tasksFromDB.filter((t) => t.dueDate !== today);
    setTasks([...todayTasks, ...otherTasks]);
  }, [today, tasksFromDB]);

  return (
    <div className="relative h-screen overflow-y-auto pb-28 bg-gradient-to-b text-black p-4">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <button
          onClick={handleBackHome}
          className="p-2 bg-white/10 rounded-full"
        >
          <ChevronLeft />
        </button>
        <h2 className="text-lg font-semibold">Today's Tasks</h2>
        <button className="p-2 bg-white/10 rounded-full">
          {/* <User /> */}
        </button>
      </header>

      {/* Calendar num of days */}
      <section className="bg-white/10 p-4 rounded-xl mb-6">
        <h3 className="text-sm font-semibold mb-2">September 2025</h3>
        <div className="grid grid-cols-8 text-sm space-x-1 overflow-x-auto w-full ">
          {days.map((day) => {
            return (
              <div
                key={day}
                className={`w-12 h-12 flex items-center justify-center rounded-full ${
                  parseInt(day) === new Date().getDate()
                    ? "bg-black text-white"
                    : "bg-white/20"
                }`}
              >
                {day}
              </div>
            );
          })}
        </div>
      </section>

      {/* Filters */}
      <section className="mb-4">
        <div className="flex flex-wrap gap-2 text-xs">
          {["All", "High", "Medium", "Low", "UI", "Bugfix", "Urgent"].map(
            (filter) => (
              <span
                key={filter}
                className={`px-3 py-1 bg-white/20 rounded-full cursor-pointer hover:bg-white/30 ${
                  filter === "All" ? " font-bold text-xl" : ""
                } `}
              >
                {filter}
              </span>
            )
          )}
        </div>
      </section>

      {/* Task List */}
      <section className="space-y-4 flex flex-wrap gap-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`p-4 rounded-xl shadow-md mb-8 w-full max-w-[375px] ${
              task.dueDate === today ? "bg-black" : "bg-white/100 text-black"
            }`}
          >
            <h4
              className={`capitalize font-bold text-xl text-black ${
                task.dueDate === today
                  ? "font-semibold text-white"
                  : "text-black"
              }`}
            >
              {task.taskTitle}
            </h4>
            <p
              className={`text-black ${
                task.dueDate === today ? "text-sm text-white/80" : "text-black"
              }`}
            >
              {task.description}
            </p>
            <div className="mt-2 flex flex-wrap gap-2 text-xs">
              {task.tags?.map((tag) => (
                <span
                  key={tag}
                  className={`${
                    task.dueDate === today
                      ? "px-2 py-0.5 bg-white/20 text-white/70 rounded-full"
                      : "text-black"
                  }`}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Floating Add Task Button */}
      {/* <button
        className="fixed bottom-6 right-6 bg-black text-white p-4 rounded-full shadow-xl hover:scale-105 transition-transform"
        onClick={() => console.log("Open Add Task Modal")}
      >
        <Plus size={24} />
      </button> */}
    </div>
  );
};

export default TodaysTasks;
