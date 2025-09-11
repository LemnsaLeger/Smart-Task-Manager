import { useState, useEffect} from "react";
import { Pause, PlayIcon, X, Check } from "lucide-react";

const Timer = () => {
  const DATE = new Date();
  const hours = DATE.getHours();
  const minutes = DATE.getMinutes();
  const [time, setTime] = useState({
    hours,
    minutes,
  });
  const [modal, setModal] = useState(false);

  // handle modAL visibility
  const handleModal = () => {
    setModal(!modal)
  }

  const intervals = [25, 30, 45, 55];
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

  return (
    <section id="timer-ui" className="min-h-[100vh] flex flex-col">
      <div
        className={`modal absolute inset-0 w-full h-full bg-black ${
          modal ? "block" : "hidden"
        }`}
      >
        <div className="modal-content place-self-center w-60 h-60 mt-60  bg-gray-100 rounded relative">
          <h3 className="border-b-1 p-4 text-xl font-semibold">
            Set Timer Interval
          </h3>
          <button
            onClick={handleModal}
            className="close-modal absolute right-2 top-3 bg-gray-200 rounded-2xl p-1"
          >
            <X />
          </button>
          <ul className={`intervals grid p-2  grid-row-5 gap-4`}>
            {intervals.map((int, index) => (
              <li key={index}>
                {int}mins {`${index === 0 ? "(Default)" : ""}`}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <h1 className="text-3xl uppercase font-semibold ">Manage This Task</h1>
      <p className="capitalize text-xl mt-2 mb-2">project title</p>

      <ul className="tags flex gap-4">
        <li className="bg-gray-700 p-1.5 rounded flex justify-center items-center-safe text-gray-300 font-medium">
          #ui
        </li>
        <li className="bg-gray-700 p-1.5 rounded flex justify-center items-center-safe text-gray-300 font-medium">
          #frontend
        </li>
      </ul>

      <section
        id="clock-container"
        className="border-2 h-40 w-40 mt-4 mb-4 rounded-[50%] place-self-center p-2"
      >
        <h3 className="w-20 mt-4 m-auto font-medium">{`${hours}:${minutes} ${ampm()}`}</h3>
        <h2 className="m-auto text-4xl mt-2 text-wrap overflow-hidden font-bold">25:00:00</h2>

        <div className="buttons flex items-center justify-center mt-4">
          <button>
            <PlayIcon />
          </button>
          <button>
            <Pause />
          </button>
        </div>
        <p className="mt-6 uppercase text-center">work</p>
      </section>

      <section id="manage-buttons" className="grid gap-2 mt-8">
        <button className="border text-[0.8em] p-1 rounded-2xl font-medium cursor-pointer bg-black text-white border-black">
          set status
        </button>
        <button className="border text-[0.8em] p-1 rounded-2xl font-medium cursor-pointer">
          pause
        </button>
        <button
          onClick={handleModal}
          className="border text-[0.8em] p-1 rounded-2xl font-medium cursor-pointer "
        >
          Set interval
        </button>
        <button className="border text-[0.8em] p-1 rounded-2xl font-medium cursor-pointer ">
          Reset timer
        </button>
        <button className="border text-[0.8em] p-1 rounded-2xl font-medium cursor-pointer ">
          Discard progress
        </button>
      </section>
    </section>
  );
};

export default Timer;
