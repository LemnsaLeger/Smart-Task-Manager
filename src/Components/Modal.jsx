import { useEffect, useState } from "react";
import getDB from "../util/getDb";
import toast from "react-hot-toast";

const Modal = ({ show, type, onClose, editingTask, setEditingTask, editingProject, setEditingProject }) => {
  const [projectTitle, setProjectTitle] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [tags, setTags] = useState("");
  const [associatedProject, setAssociatedProject] = useState("");
  const [priority, setPriority] = useState("");
  const [accentColor, setAccentColor] = useState("");
  const [projects, setProjects] = useState([]);
    // state for holding errors
  const [errors, setErrors] = useState({
  });


  // 
  const isEditing =
    type === "task" ? editingTask !== null : editingProject !== null;


    const formData = {
      ...(isEditing ? (type === "task" ? editingTask : editingProject) : {}),
      ...{
        // updated fields
        projectTitle,
        taskTitle,
        description,
        dueDate,
        tags: tags.split(",").map((t) => t.trim()),
        associatedProject,
        priority,
        accentColor,
        status: isEditing
          ? type === "task"
            ? editingTask.status
            : editingProject.status
          : "pending",
        createdAt: isEditing
          ? type === "task"
            ? editingTask.createdAt
            : editingProject.createdAt
          : new Date(),
      },
    };

  useEffect(() => {
    const request = indexedDB.open("SmartTaskManager", 2);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("projects")) {
        db.createObjectStore("projects", {
          keyPath: "id",
          autoIncrement: true,
        });
      }
      if (!db.objectStoreNames.contains("tasks")) {
        db.createObjectStore("tasks", { keyPath: "id", autoIncrement: true });
      }
    };

    request.onsuccess = (event) => {
      const db = event.target.result;

      // Load projects for dropdown
      if (type === "task" && show) {
        const tx = db.transaction("projects", "readonly");
        const store = tx.objectStore("projects");
        const getAll = store.getAll();

        getAll.onsuccess = () => {
          setProjects(getAll.result);
        };
      }

      // Pre-fill form fields when editing
      if (show) {
        if (isEditing && type === "task") {
          setTaskTitle(editingTask.taskTitle);
          setDescription(editingTask.description);
          setDueDate(editingTask.dueDate);
          setTags(
            Array.isArray(editingTask?.tags)
              ? editingTask.tags.join(", ")
              : editingTask?.tags || ""
          );

          setAssociatedProject(editingTask.associatedProject);
          setTags(editingTask.tags.join(", "));
        } else if (isEditing && type === "project") {
          setProjectTitle(editingProject.projectTitle);
          setDescription(editingProject.description);
          setAccentColor(editingProject.accentColor);
         setTags(
           Array.isArray(editingProject?.tags)
             ? editingProject.tags.join(", ")
             : editingProject?.tags || ""
         );

        } else {
          // reset fields when not editing
          setProjectTitle("");
          setTaskTitle("");
          setDescription("");
          setDueDate("");
          setTags("");
          setAssociatedProject("");
          setPriority("");
          setAccentColor("");

          if (setEditingTask) setEditingTask(null);
          if (setEditingProject) setEditingProject(null);
        }
      }
    };

    request.onerror = (e) => {
      console.error("IndexedDB error:", e);
    };
  }, [type, show, isEditing]);


  // initialize IndexedDB
  const request = indexedDB.open("SmartTaskManager", 2);

  request.onupgradeneeded = function (event) {
    const db = event.target.result;
    if (!db.objectStoreNames.contains("projects")) {
      db.createObjectStore("projects", {
        keyPath: "id",
        autoIncrement: true,
      });
    }
    if (!db.objectStoreNames.contains("tasks")) {
      db.createObjectStore("tasks", { keyPath: "id", autoIncrement: true });
    }
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  const newErrors = {};

  if (type === "project" && !projectTitle.trim()) {
    newErrors.projectTitle = "Project title is required";
  }
  if (type === "task") {
    if (!taskTitle.trim()) newErrors.taskTitle = "Task title is required";
    if (!dueDate.trim()) newErrors.dueDate = "Due date is required";
    if (!associatedProject.trim())
      newErrors.associatedProject = "Select a project";
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  setErrors({});

  try {
    const db = await getDB();
    const tx = db.transaction(
      type === "project" ? "projects" : "tasks",
      "readwrite"
    );
    const store = tx.objectStore(type === "project" ? "projects" : "tasks");

    const isEdit = type === "task" ? editingTask : editingProject;

    const formData = {
      ...(isEdit || {}),
      ...(type === "project"
        ? {
            projectTitle,
            description,
            accentColor,
            tags: tags.split(",").map((t) => t.trim()),
            percentage: isEdit?.percentage || 0,
            status: isEdit?.status || "stale",
            createdAt: isEdit?.createdAt || new Date(),
          }
        : {
            taskTitle,
            description,
            dueDate,
            tags: tags.split(",").map((t) => t.trim()),
            associatedProject,
            priority,
            status: isEdit?.status || "pending",
            timeCompleted: isEdit?.timeCompleted || 0,
            createdAt: isEdit?.createdAt || new Date(),
          }),
    };

    const request = isEdit ? store.put(formData) : store.add(formData);

    request.onsuccess = () => {
      toast.success(
        `${type === "project" ? "Project" : "Task"} ${
          isEdit ? "updated" : "added"
        }!`
      );
      onClose(); // after success transaction from DB close modal
      setProjectTitle("");
      setTaskTitle("");
      setDescription("");
      setDueDate("");
      setTags("");
      setAssociatedProject("");
      setPriority("");
      setAccentColor("");

      if (setEditingTask) setEditingTask(null);
      if (setEditingProject) setEditingProject(null);
    };

    request.onerror = (event) => {
      console.error("Error adding/updating to IndexedDB:", event.target.error);
      toast.error("Error saving item. Please try again.");
    };
  } catch (err) {
    console.error("IndexedDB error:", err);
    toast.error("Error accessing database. Please try again.");
  }
};

  if (!show) {
    return null;
  }

  let title = "";
  let content = null;

  const glassInputClasses =
    "w-full p-2 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400";
  const priorityButtonClasses = "px-3 py-1 rounded-full text-white border";

  if (type === "project") {
    title = isEditing ? "Editing Project" : "Create a New Project";
    content = (
      <form className="space-y-4">
        <div>
          <label htmlFor="project-title" className="text-sm font-semibold">
            Project Title
          </label>
          <input
            type="text"
            id="project-title"
            className={`${glassInputClasses} ${
              errors.projectTitle ? "border-red-500 ring-red-50" : ""
            }`}
            placeholder="e.g., UI/UX Design"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
          />
          {errors.projectTitle && <p className="text-sm text-red-500 mt-1">{errors.projectTitle}</p>}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label htmlFor="tags">
            Tags (Optional)
          </label>
          <input className={glassInputClasses} type="text" name="tags" placeholder="#fitness, #creative" id="tags" value={tags} onChange={(e) => setTags(e.target.value)}/>
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
              onClick={() => setAccentColor("purple")}
            ></button>
            <button
              type="button"
              className="w-8 h-8 rounded-full bg-cyan-500/50 hover:ring-2 ring-blue-500 transition-all"
              onClick={() => setAccentColor("cyan")}
            ></button>
            <button
              type="button"
              className="w-8 h-8 rounded-full bg-pink-500/50 hover:ring-2 ring-blue-500 transition-all"
              onClick={() => setAccentColor("pink")}
            ></button>
          </div>
        </div>
      </form>
    );
  } else if (type === "task") {
    title = isEditing ? "Editing Task" : "Create a New Task.";
    content = (
      <form className="space-y-4 rounded-2xl">
        <div>
          <label htmlFor="task-title" className="text-sm font-semibold">
            Task Title
          </label>
          <input
            type="text"
            id="task-title"
            className={`${glassInputClasses} ${
              errors.taskTitle ? "border-red-500 ring-red-500" : ""
            }`}
            placeholder="e.g., Finish wireframes"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          {
            errors.taskTitle && (
                <p className="text-sm text-red-500 mt-1">{errors.taskTitle}</p>
            )
          }
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label htmlFor="due-date" className="text-sm font-semibold">
            Due Date
          </label>
          <input
            type="date"
            id="due-date"
            className={`${glassInputClasses} ${
              errors.taskTitle ? "border-red-500 ring-red-500" : ""
            }`}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          {
            errors.dueDate && (
                <p className="text-sm text-red-500 mt-1">{errors.dueDate}</p>
            )
          }
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
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="project-select" className="text-sm font-semibold">
            Associated Project
          </label>
          <select
            id="project-select"
            className={`${glassInputClasses} bg-transparent ${
              errors.taskTitle ? "border-red-500 ring-red-500" : ""
            }`}
            value={associatedProject}
            onChange={(e) => setAssociatedProject(e.target.value)}
          >
            <option className="bg-neutral-800 font-semibold" value="">
              -- Select a Project --
            </option>

            {projects.map((project) => (
              <option
                key={project.id}
                className="bg-white/100 text-black"
                value={project.projectTitle}
              >
                {project.projectTitle}
              </option>
            ))}
          </select>
          {errors.associatedProject && (
            <p className="text-sm text-red-500 mt-1">{errors.associatedProject}</p>
          )}
        </div>
        <fieldset>
          <legend className="text-sm font-semibold mb-2">Priority</legend>
          <div className="flex space-x-2">
            <button
              type="button"
              className={`${priorityButtonClasses} bg-red-500/50 border-red-500 hover:bg-red-500 transition-colors`}
              value={priority}
              onClick={() => setPriority("high")}
            >
              High
            </button>
            <button
              type="button"
              className={`${priorityButtonClasses} bg-yellow-500/50 border-yellow-500 hover:bg-yellow-500 transition-colors`}
              onClick={() => setPriority("medium")}
            >
              Medium
            </button>
            <button
              type="button"
              className={`${priorityButtonClasses} bg-blue-500/50 border-blue-500 hover:bg-blue-500 transition-colors`}
              onClick={() => setPriority("low")}
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
      } -max-h-[70vh] overflow-y-auto transition-all duration-300 ease-out transform scale-95 `}
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
          <button
            className="px-4 py-2 text-sm rounded-full bg-gray-900 text-white transition-colors"
            onClick={handleSubmit}
          >
            Save
          </button>
        </footer>
      </div>
    </div>
  );
};


export default Modal;