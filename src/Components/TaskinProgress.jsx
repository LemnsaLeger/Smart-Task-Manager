

const InProgressTask = ({ title }) => {
    return (
      <article className=" relative rounded-[10px] border border-gray-200 bg-white px-4 pt-2 pb-4 dark:border-gray-700 backdrop-blur-md dark:bg-gray-900 w-[60%] flex-shrink-0">
        <time
          dateTime="2022-10-10"
          className="block text-xs text-gray-500 dark:text-gray-400"
        >
          10th Oct 2025
        </time>

        <a href="#">
          <h3 className="mt-0.5 text-sm font-medium text-gray-900 dark:text-white">
            {title}
          </h3>
        </a>

        <div className="mt-2 flex flex-wrap gap-1 h-2 w-[100%] bg-white rounded-2xl relative"></div>
        <div className="h-2 rounded-2xl w-[20%] bg-orange-400 -mt-2 fixed"></div>
      </article>
    );
}


export default InProgressTask;