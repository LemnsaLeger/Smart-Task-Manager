import { Plus } from "lucide-react";

const Button = ({ onClick, type }) => {
    return (
        <button className="bg-white rounded-full text-black cursor-pointer"
        onClick={() => {
            if (onClick) {
                onClick();
                type = "task";
            }}}
        >
            <Plus strokeWidth={2} />
        </button>
    );
}

export default Button;