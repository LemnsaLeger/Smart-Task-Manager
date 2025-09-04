import { Plus } from "lucide-react";

const Button = () => {
    return (
        <button className="bg-white rounded-full text-black cursor-pointer">
            <Plus strokeWidth={2} />
        </button>
    );
}

export default Button;