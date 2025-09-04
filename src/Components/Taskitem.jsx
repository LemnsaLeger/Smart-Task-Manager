

const TaskItem = ({ title, dueDate, tags }) => {
    return (
        <article className="glass-card p-4 flex items-center justify-between backdrop-blur-md">
            <div>
                <h4 className="font-semibold text-lg"> {title} </h4>
                <p className="text-gray-400 text-sm">Due: {dueDate}</p>
            </div>
            <p className="flex items-center space-x-2">
                {tags.map((tag, index) => (
                    <span key={index} className={`bg-blue-600 text-white text-xs font-semibold`}>
                        {tag}
                    </span>
                ))}
            </p>
        </article>
    );
}

export default TaskItem;