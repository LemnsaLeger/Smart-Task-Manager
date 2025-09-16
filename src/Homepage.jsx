import Navbar from "./Components/Navbar.jsx";
import Card from "./Components/Card.jsx";
import InProgressTask from "./Components/TaskinProgress.jsx";
import TaskList from "./Components/TaskList.jsx";
import Button from "./Components/Button.jsx";
import Modal from "./Components/Modal.jsx";
import TodaysTasks from "./TaskPage.jsx";
import Timer from "./features/PomodoroTimer.jsx";
import getDB from "./util/getDb.js";

import  "../src/index.css";
import { useCallback, useState } from "react";

import { Plus } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("project");
  const [isActive, setIsActive] = useState(true);
  const [activeTask, setActiveTask] = useState(null);
  const [page, setPage] = useState("home");
  const [taskFromDB, setTaskFromDB] = useState([]);
  const [projectsFromDB, setProjects] = useState([]);
  const [editData, setEditData] = useState(null); // update pop
  const [activeProject, setActiveProject] = useState("");

  const projectTasks = (projectName) => {
    const tasks = taskFromDB.filter((task) => task.associatedProject === activeProject);
    return tasks;
  }

  //  get projects and tasks
  const fetchProjects = async () => {
    try {
      const db = await getDB();
      const tx = db.transaction("projects", "readonly");
      const store = tx.objectStore("projects");
      const request = store.getAll();
      request.onsuccess = (e) => {
        setProjects(e.target.result);
      };
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  const fetchTasks = async () => {
    try {
      const db = await getDB();
      const tx = db.transaction("tasks", "readonly");
      const store = tx.objectStore("tasks");
      const request = store.getAll();
      request.onsuccess = (e) => {
        setTaskFromDB(e.target.result);
      };
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  // UPDATE
  const updateItem = async (type, updatedItem) => {
    try {
      const db = await getDB();
      const tx = db.transaction(
        type === "project" ? "projects" : "tasks",
        "readwrite"
      );
      const store = tx.objectStore(type === "project" ? "projects" : "tasks");
      const request = store.put(updatedItem);
      request.onsuccess = () => {
        toast.success(`${type} updated`);
        refreshData();
      };
      request.onerror = () => {
        toast.error("Failed to update item");
      };
    } catch (err) {
      console.error("Error updating item:", err);
      toast.error("Error accessing DB");
    }
  };

  // DELETE
  const deleteItem = async (type, id) => {
    try {
      const db = await getDB();
      const tx = db.transaction(
        type === "project" ? "projects" : "tasks",
        "readwrite"
      );
      const store = tx.objectStore(type === "project" ? "projects" : "tasks");
      const request = store.delete(id);
      request.onsuccess = () => {
        toast.success(`${type} deleted`);
        refreshData();
      };
      request.onerror = () => {
        toast.error("Failed to delete item");
      };
    } catch (err) {
      console.error("Error deleting item:", err);
      toast.error("Error accessing DB");
    }
  };

  // Refresh
  const refreshData = useCallback(() => {
    fetchProjects();
    fetchTasks();
  },[]);



  // handle clicked task
  const handleClickedTask = (task) => {
    if (task) {
      setActiveTask(task);
      handleSetPage("manage task");
    }
  };

  // handle setPage
  const handleSetPage = (pageName) => {
    setPage(pageName);
  };

  const handleBackHome = () => {
    setPage("home");
  };

  // view project
  const handleProjectView = () => {
    setPage("project tasks");
  };

  // handle current project
  const handleActiveProject = (name) => {
    setActiveProject(name);
  }


  // render
  const render = () => {
    switch (page) {
      case "home":
        return (
          <main className="p-4">
            {/* <Timer /> */}
            {/* <TodaysTasks /> */}
            <Modal
              show={isModalOpen}
              type={modalType}
              onClose={() => setIsModalOpen(false)}
            />
            <section className="cards-projects">
              <section className="projects-header flex justify-between mb-2">
                <h3 className="relative -bottom-2 font-medium text-2xl">
                  Projects
                </h3>
                <button
                  className="bg-black p-2 rounded-full text-white cursor-pointer"
                  onClick={() => {
                    setModalType("project");
                    openModal();
                  }}
                >
                  <Plus strokeWidth={3} />
                </button>
              </section>

              {/* projects view */}
              <section className="flex gap-4 overflow-x-auto pb-4 scroll-container">
                {projectsFromDB.map((project, idx) => (
                  <div key={project.id} className="min-w-[19rem] shrink-0 ">
                    <Card
                      title={project.projectTitle}
                      description={project.description}
                      hashTags={
                        typeof project.tags === "string"
                          ? project.tags.split(",").map((tag) => tag.trim())
                          : []
                      }
                      onClick={() => {
                        setPage("view project");
                        setActiveProject(project.projectTitle)
                      }}
                      percentageComplete={project.percentage}
                      createdAt={project.createdAt.toDateString()}
                      deleteItem={() => deleteItem("project", project.id)}
                      updateItem={() => {
                        const updatedProject = {
                          ...project,
                          projectTitle: "Updated title",
                        };
                        updateItem("project", updatedProject);
                      }}
                    />
                  </div>
                ))}
              </section>

              {/* bar carousel for  */}
              <section className="my-6 mt-8">
                <h3 className="text-xl font-semibold mb-4">In Progress</h3>
                <div className="flex gap-4 overflow-x-auto pb-4 scroll-container">
                  <InProgressTask title="Design Landing Page" />
                  <InProgressTask title="Build API Endpoints" />
                  <InProgressTask title="Configure Database" />
                </div>
              </section>
            </section>
            <aside className="tasks relative">
              <h3 className="font-medium text-2xl">Today's Tasks</h3>
              {/* {create new task butto} */}
              <div className="flex items-center justify-end gap-1 font-medium absolute right-4 top-2 p-1 rounded-2xl  cursor-pointer border border-gray-300">
                new task{" "}
                <Button
                  onClick={() => {
                    setModalType("task");
                    setIsModalOpen(true);
                  }}
                />   
              </div>
              <section>
                <TaskList openTask={handleClickedTask}/>
              </section>
            </aside>
          </main>
        );

      case "view task":
        if (activeTask) {
          return <Timer handleBackHome={handleBackHome} />;
        }
        break;
      case "view project":
        return <>
          <TaskList tasks={projectTasks(activeProject)} openTask={handleClickedTask}/>
        </>;

      case "project tasks":
        return <TaskList tasks={taskFromDB} />;

        case "manage task":
          return <Timer handleBackHome={handleBackHome}/>
    }
  };

  const onClose = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  
  useEffect(() => {
    if (!isModalOpen) {
      refreshData();
    }
  }, [isModalOpen, refreshData]);


  return (
    <>
      <header className="w-full static  top-0 left-0 z-50 h-[4rem] shadow-sm">
        <Navbar />
      </header>

      {/* <p>We are home!</p> */}
      {render()}
    </>
  );
}

export default HomePage;