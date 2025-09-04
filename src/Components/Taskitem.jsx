

const TaskItem = ({ title, dueDate, tags }) => {
    return (
      <article className="glass-card p-4 flex items-center backdrop-blur bg-white/30 rounded shadow justify-between">
        <div className="relative">
          <h4 className="font-semibold text-lg"> {title} </h4>
          <p className="text-gray-400 text-sm ">Due: {dueDate}</p>
        </div>
        <p className="flex items-center space-x-2 relative">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`bg-black text-white text-[0.5em] font-semibold p-1 rounded-xl text-center`}
            >
              {tag}
            </span>
          ))}
        </p>
      </article>
    );
}

export default TaskItem;