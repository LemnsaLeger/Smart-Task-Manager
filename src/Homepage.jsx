import Navbar from "./Components/Navbar.jsx";
import Card from "./Components/Card.jsx";
import InProgressTask from "./Components/TaskinProgress.jsx";
import TaskList from "./Components/TaskList.jsx";
import Button from "./Components/Button.jsx";
import Modal from "./Components/Modal.jsx";

import  "../src/index.css";
import { useState } from "react";

import { Plus } from "lucide-react";

const HomePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState("project");
    // const color = "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500";
    const onClose = () => {
        setIsModalOpen(false);
    }

    const openModal = () => {
        setIsModalOpen(true);
    }
 return (
   <>
     <header className="w-full hstatic  top-0 left-0 z-50 h-[4rem] shadow-sm">
       <Navbar />
     </header>
     <main className="p-4">
       <Modal show={isModalOpen} type={modalType} onClose={() => setIsModalOpen(false)}/>
       <section className="cards-projects">
         <section className="projects-header flex justify-between mb-2">
           <h3 className="relative -bottom-2 font-medium text-2xl">Projects</h3>
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
         <Card />

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
           <TaskList />
         </section>
       </aside>
     </main>
     {/* <p>We are home!</p> */}
   </>
 );
}

export default HomePage;