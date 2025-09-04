

const Modal = ({ show, type, onClose }) => {

  if (!show) {
    return null;
  }

  let title = "";
  let content = null;

  const glassInputClasses =
    "w-full p-2 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400";
  const priorityButtonClasses = "px-3 py-1 rounded-full text-white border";

  if (type === "project") {
    title = "Create a New Project";
    content = (
      <form className="space-y-4">
        <div>
          <label htmlFor="project-title" className="text-sm font-semibold">
            Project Title
          </label>
          <input
            type="text"
            id="project-title"
            className={glassInputClasses}
            placeholder="e.g., UI/UX Design"
          />
        </div>
        <div>
          <label
            htmlFor="project-description"
            className="text-sm font-semibold"
          >
            Description (Optional)
          </label>
          <textarea
            id="project-description"
            className={glassInputClasses}
            rows="3"
            placeholder="e.g., Create wireframes and mockups."
          ></textarea>
        </div>
        <div>
          <p className="text-sm font-semibold mb-2">Accent Color</p>
          <div
            role="radiogroup"
            aria-label="Accent Color"
            className="flex space-x-2"
          >
            <button
              type="button"
              className="w-8 h-8 rounded-full bg-purple-500/50 hover:ring-2 ring-blue-500 transition-all"
            ></button>
            <button
              type="button"
              className="w-8 h-8 rounded-full bg-cyan-500/50 hover:ring-2 ring-blue-500 transition-all"
            ></button>
            <button
              type="button"
              className="w-8 h-8 rounded-full bg-pink-500/50 hover:ring-2 ring-blue-500 transition-all"
            ></button>
          </div>
        </div>
      </form>
    );
  } else if (type === "task") {
    title = "Create a New Task";
    content = (
      <form className="space-y-4 rounded-2xl">
        <div>
          <label htmlFor="task-title" className="text-sm font-semibold">
            Task Title
          </label>
          <input
            type="text"
            id="task-title"
            className={glassInputClasses}
            placeholder="e.g., Finish wireframes"
          />
        </div>
        <div>
          <label htmlFor="task-description" className="text-sm font-semibold">
            Description (Optional)
          </label>
          <textarea
            id="task-description"
            className={glassInputClasses}
            rows="3"
            placeholder="e.g., Complete the homepage and task view wireframes."
          ></textarea>
        </div>
        <div>
          <label htmlFor="due-date" className="text-sm font-semibold">
            Due Date
          </label>
          <input type="date" id="due-date" className={`${glassInputClasses}`} />
        </div>
        <div>
          <label htmlFor="tags" className="text-sm font-semibold">
            Tags
          </label>
          <input
            type="text"
            id="tags"
            className={glassInputClasses}
            placeholder="e.g., #urgent, #design"
          />
        </div>
        <div>
          <label htmlFor="project-select" className="text-sm font-semibold">
            Associated Project
          </label>
          <select
            id="project-select"
            className={`${glassInputClasses} bg-transparent`}
          >
            <option className="bg-neutral-800">UI/UX Design</option>
            <option className="bg-neutral-800">Front-End Development</option>
          </select>
        </div>
        <fieldset>
          <legend className="text-sm font-semibold mb-2">Priority</legend>
          <div className="flex space-x-2">
            <button
              type="button"
              className={`${priorityButtonClasses} bg-red-500/50 border-red-500 hover:bg-red-500 transition-colors`}
            >
              High
            </button>
            <button
              type="button"
              className={`${priorityButtonClasses} bg-yellow-500/50 border-yellow-500 hover:bg-yellow-500 transition-colors`}
            >
              Medium
            </button>
            <button
              type="button"
              className={`${priorityButtonClasses} bg-blue-500/50 border-blue-500 hover:bg-blue-500 transition-colors`}
            >
              Low
            </button>
          </div>
        </fieldset>
      </form>
    );
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm ${
        show ? "block" : "hidden"
      } -max-h-[70vh] overflow-y-auto`}
    >
      <div className="glass-card p-6 w-11/12 max-w-md mx-auto">
        <header
          className={`flex justify-between items-center ${
            type === "project" ? "bg-white" : "bg-white/60"
          } mb-4  p-3 rounded-lg`}
        >
          <h3 className="font-bold text-lg ">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </header>
        <section className="p-4 overflow-y-auto bg-white rounded">
          {content}
        </section>
        <footer className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-full bg-white/100 shadow-md hover:bg-white/20 transition-colors"
          >
            Cancel
          </button>
          <button className="px-4 py-2 text-sm rounded-full bg-gray-900 text-white transition-colors">
            Save
          </button>
        </footer>
      </div>
    </div>
  );
};


export default Modal;