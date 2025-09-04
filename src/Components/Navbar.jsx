import { Bell, Moon } from "lucide-react";
import "../index.css";

const Navbar = () => {
  return (
    <nav className="w-[90%] place-self-center h-full flex justify-between items-center">
      <h1 className="logo text-3xl font-bold ">TaskFisher</h1>
      <ul className="nav-items flex gap-6 items-center">
        <li>
          <button>
            <Moon strokeWidth={2} width={30} height={30} />
          </button>
        </li>
        <li>
          <a href="#">
            <Bell strokeWidth={2} width={30} height={30} />
          </a>
        </li>
        <li>
          <a href="#">
            <img
              className="size-9 object-fit rounded-full"
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
              alt="Avatar"
            ></img>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
