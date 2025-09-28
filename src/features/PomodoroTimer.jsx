import { useState, useEffect, useRef} from "react";
import {
  Pause,
  PlayIcon,
  X,
  Check,
  Clock,
  ChevronLeft,
} from "lucide-react";
import toast from "react-hot-toast";
import Modal from "./modal.jsx";
import Button from "../Components/Button.jsx";
import getDB from "../util/getDb.js";

const Timer = ({ handleBackHome, task, updateItem}) => {
  const DATE = new Date();
  const hours = DATE.getHours();
  const minutes = DATE.getMinutes();
  const [time, setTime] = useState({
    hours,
    minutes,
  });
  const [modal, setModal] = useState(false);

  // durations would be in milliseconds
  const [workDuration, setWorkDuration] = useState(task.workDuration);
  const [isActive, setIsActive] = useState(false);
  const [timer, setTimer] = useState(workDuration);
  const [shortDuration, setShortDuration] = useState(task.shortDuration);
  const [longDuration, setLongDuration] = useState(task.longDuration);
  const [currentMode, setCurrentMode] = useState("work");
  const [remainingTime, setRemainingTime] = useState(workDuration);
  const [numberOfCycles, setNumberOfCycles] = useState(0);
  const [totalTimeWorking, setWorkingTime] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [intervals, setIntervals] = useState([]);
  const [modalTitle, setModalTitle] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  // useRef to persist interval id between renders
  const intervalRef = useRef(null);
  const lastUpdatedRef = useRef(Date.now());

  // update a timer when duration or mode changes
  useEffect(() => {
    if (currentMode === "work") setTimer(workDuration);
    else if (currentMode === "short break") setTimer(shortDuration);
    else setTimer(longDuration);
  }, [workDuration, shortDuration, longDuration, currentMode]);

  // timer countdown effect
  useEffect(() => {
    if (isActive) {
      lastUpdatedRef.current = Date.now();
      intervalRef.current = setInterval(() => {
        const now = Date.now();
        const change = now - lastUpdatedRef.current;
        lastUpdatedRef.current = now;

        if(currentMode === "work") {
          setWorkingTime((prev) => prev + change);
        }

        setTimer((prev) => {
          const next = prev - change;
          if (next <= 0) {
            clearInterval(intervalRef.current); // when timer hits 0
            handleIntervalEnd();
            return 0;
          }
          return next;
        });
      }, 50); // update every 50 milliseconds
    }
    return () => clearInterval(intervalRef.current);
  }, [isActive, currentMode]);

  // handle what happens when timer hits 0
  const handleIntervalEnd = () => {
    toast.success(`${currentMode}'s mode is Up!`);
    if (currentMode === "work") {
      const newCycles = numberOfCycles + 1;
      setNumberOfCycles(newCycles);
      setWorkingTime((prev) => prev + workDuration);
      if (newCycles % 4 === 0) {
        setCurrentMode("long break");
      } else {
        setCurrentMode("short break");
      }
    } else {
      setCurrentMode("work");
    }
    setIsActive(true); // automatically starting next session
  };

  // format seconds to mm:ss
  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    const ms = Math.floor((milliseconds % 1000) / 10); // show 2 digits example is 56 for 560 ms

    return `${m.toString().padStart(2, "0")}:${s
      .toString()
      .padStart(2, "0")}:${ms.toString().padStart(2, "0")}`;
  };

  // users choice change handler , converting m to s
  const handleWorkChange = (value) => {
    const val = Math.max(1, Number(value));
    setWorkDuration(val * 60 * 1000);
  };

  const handleShortBreakChange = (value) => {
    const val = Math.max(1, Number(value));
    setShortDuration(val * 60 * 1000);
  };

  const handleLongBreakChange = (value) => {
    const val = Math.max(1, Number(value));
    setLongDuration(val * 60 * 1000);
  };

  // buttons control
  const startTimer = () => setIsActive(true);
  const pauseTimer = () => setIsActive(false);
  const resetTimer = () => {
    setIsActive(false);
    if (currentMode === "work") setTimer(workDuration);
    else if (currentMode === "short break") setTimer(shortDuration);
    else setTimer(longDuration);
  };
  // handle modAL visibility
  const handleModal = () => {
    setModal(!modal);
  };

  // const intervals = [25, 30, 45, 55];
  // am and pm logic
  const ampm = (h) => {
    if (h <= 12) {
      return "am";
    }
    return "pm";
  };

  // time handler
  const handleTime = () => {
    setTime({
      hours: DATE.getHours(),
      minutes: DATE.getMinutes(),
    });
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      handleTime();
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  });

   const handleComplete = () => {
     const newStatus =
       task.status === "completed" ? "in-progress" : "completed";

     // Create the updated task object
     const updatedTask = {
       ...task,
       status: newStatus,
       completionDate: newStatus === "completed" ? new Date() : null, 
       timeCompleted: totalTimeWorking,
     };

     // Call the updateItem function passed from the parent component
     updateItem("task", updatedTask);

     if (newStatus === "completed") {
       toast.success("Task Completed 🐎 🎉");
       pauseTimer();
     } else {
       toast.error("Task Completion Canceled!");
     }
   };

   // function to format millisecs to hh:mm:ss
   const formatTotalTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
   }
 
  // handle intervals
  const handleInterval = (title, intervals) => {
    handleModal();
    setModalTitle(title);
    setIntervals(intervals);
  };

  // days to dueDate
  const daysBetweenDates = (date1, date2) => {
    const date1Timestamp = new Date(date1).getTime();
    const date2Timestamp = new Date(date2).getTime();
    const difference = Math.abs(date2Timestamp - date1Timestamp);
    const days = Math.ceil(difference / (1000 * 3600 * 24));
    return days;
  }

  // get current date
  useEffect(() => {
    const getCurrentDate = () => {
      const currrent = new Date();
      const month = currrent.getMonth() + 1;
      const day = currrent.getDate();
      const fullYear = currrent.getFullYear();

      return `${fullYear}-${month.toString().padStart(2, 0)}-${day.toString().padStart(2, 0)}`;
    }

    setCurrentDate(getCurrentDate());
  }, []);

  // total days worked
  const getTotalTimeOfWork = () => {
    if(isComplete) {
      setWorkingTime()
    }
  }

  // this function handles user selected interval
  const handleIntervalSelect = async (minutes) => {
    const durationInMS = minutes * 60 * 1000;
    let updatedTask = {...task};

    if (modalTitle.includes("Work")) {
    setWorkDuration(durationInMS);
    setTimer(durationInMS); // Set main timer
    setCurrentMode("work");
   
    updatedTask.workDuration = durationInMS;
  } else if (modalTitle.includes("Break")) {
    setShortDuration(durationInMS);
    setLongDuration(durationInMS * 3); 
    updatedTask.shortDuration = durationInMS;
    updatedTask.longDuration = durationInMS * 3;
  }
  
  setModal(false)

  try {
   // save the updated values to DB
    await updateItem("task", updatedTask);
    toast.success("Interval updated and saved!");

    // Updating the local task prop reference to reflect the saved changes
    task.workDuration = updatedTask.workDuration;
    task.shortDuration = updatedTask.shortDuration;
    task.longDuration = updatedTask.longDuration;
  } catch (error) {
    console.error("Failed to save timer settings:", error);
    toast.error("Failed to save settings.");
  }
  }

  return (
    <section id="timer-ui" className="min-h-[100vh] flex flex-col p-4 max-w-[800px] place-self-center">
      {intervals && modal && (
        <Modal
          show={modal}
          intervals={intervals}
          title={modalTitle}
          handleModal={() => setModal(!modal)}
          onSelectInterval={handleIntervalSelect}
          handleClose={() => setModal(!modal)}
        />
      )}
      <h1 className="text-3xl uppercase font-semibold ">{task.taskTitle}</h1>
      <p className=" text-xl mt-2 mb-4">
        {task.description ? task.description : "add desc"}
      </p>

      <section className="flex justify-between mb-4">
        <p
          className={` text-white/80 w-fit p-1 rounded mb-2 font-medium ${
            task.priority === "medium" ? "bg-blue-800" : ""
          } ${task.priority === "high" ? "bg-red-800" : ""} ${
            task.priority === "low" ? "bg-gray-800" : ""
          }`}
        >
          {task.priority}
        </p>
        <div className="flex items-center border w-fit p-0.5 pl-1 pr-2 gap-2 text-sm rounded-2xl">
          <Clock className="sm:size-6 font-semibold" />
          <p>
            {task.status === "completed"
              ? "Completed ! 🥳🐎"
              : `${task.dueDate}`}
          </p>
        </div>
      </section>

      <ul className="tags flex gap-4">
        {/* <li className="bg-gray-700 rounded flex justify-center items-center-safe text-gray-300 font-medium">
          #ui
        </li>
        <li className="bg-gray-700 rounded flex justify-center items-center-safe text-gray-300 font-medium">
          #frontend
        </li> */}
        {task.tags.map((tag, idx) => {
          return (
            <li
              key={idx}
              className="bg-gray-700 rounded flex justify-center items-center-safe text-gray-300 font-medium"
            >
              {tag}
            </li>
          );
        })}
      </ul>

      {/* status bar */}
      <section className="h-fit bg-gray-300 rounded mt-4">
        <p className="pl-2 font-medium flex justify-between pr-2">
          {task.status === "completed"
            ? "Completed ! 🥳🐎"
            : `${daysBetweenDates(task.dueDate, currentDate)} day(s) left!`}
          <span className="block">
            Total time taken: {formatTime(task.totalTimeTaken || 0)}
          </span>
        </p>
      </section>

      <section
        id="clock-container"
        className="border-2 h-40 w-40 mt-4 mb-4 rounded-[50%] place-self-center p-2"
      >
        <h3 className="w-20 mt-4 m-auto font-medium">{`${hours
          .toString()
          .padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")} ${ampm()}`}</h3>
        <h2 className="m-auto text-4xl mt-2 text-wrap overflow-hidden font-bold">
          {formatTime(timer)}
        </h2>

        <div className="buttons flex items-center justify-center mt-4">
          {" "}
          <button
            className="cursor-pointer"
            onClick={startTimer}
            disabled={isActive || task.status === "completed"}
          >
            {" "}
            <PlayIcon
              color={`${
                isActive || task.status === "completed" ? "gray" : "black"
              }`}
            />{" "}
          </button>{" "}
          <button
            onClick={pauseTimer}
            className="cursor-pointer"
            disabled={task.status === "completed"}
          >
            {" "}
            <Pause
              color={`${
                isActive && task.status !== "completed" ? "black" : "gray"
              }`}
            />{" "}
          </button>
        </div>
        <p className="mt-6 uppercase text-center">{currentMode}</p>
      </section>

      <section id="manage-buttons" className="grid gap-2 mt-8 relative">
        <button
          onClick={handleComplete}
          className={`border text-[0.8em] p-1 rounded-2xl font-medium cursor-pointer ${
            task.status === "completed" ? " bg-black text-white" : ""
          } border-black`}
        >
          {task.status === "completed" ? "Completed!" : "complete"}
        </button>
        <button
          className="border text-[0.8em] p-1 rounded-2xl font-medium cursor-pointer"
          onClick={() => handleInterval("Set Break Interval", [5, 10, 15])}
        >
          Set break interval
        </button>
        <button
          onClick={() => {
            handleInterval("Set break interval", [25, 30, 45, 55]);
            handleModal();
          }}
          className="border text-[0.8em] p-1 rounded-2xl font-medium cursor-pointer "
        >
          Set Work interval
        </button>
        <button
          onClick={resetTimer}
          className="border text-[0.8em] p-1 rounded-2xl font-medium cursor-pointer "
        >
          Reset timer
        </button>
      </section>

      <button
        className="fixed bottom-0 left-4 border p-2 rounded-2xl text-[0.9rem] font-medium flex"
        onClick={() => handleBackHome()}
      >
        <ChevronLeft />
        back
      </button>
    </section>
  );
};

export default Timer;
