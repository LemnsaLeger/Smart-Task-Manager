import toast from "react-hot-toast";

const getDB = () => {
  return new Promise((resolve, reject) => {
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
        db.createObjectStore("tasks", {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject("Failed to open IndexedDB");
        toast.error("Failed to access database, please try again");
    };
  });
};
export default getDB;