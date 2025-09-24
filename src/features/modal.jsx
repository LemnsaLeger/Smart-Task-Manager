
const Modal = ({modal, intervals, handleModal, title}) => {
   return (
     <div
       className={`modal absolute inset-0 w-full h-full bg-white/50 backdrop-blur-md ${
         modal ? "block" : "hidden"
       }`}
     >
       <div className="modal-content place-self-center w-60 h-60 mt-60  bg-gray-100 rounded relative">
         <h3 className="border-b-1 p-4 text-xl font-semibold">
           {title}
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
   );
}

export default Modal;