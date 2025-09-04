import { CircleChevronRight } from "lucide-react";
const Card = () => {
    return (
      <article className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
        <div className="p-4 md:p-5 flex flex-col gap-3 relative">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            My First Project
          </h3>
          <span className="text-amber-50 absolute text-sm right-2">Created: 15th Jan</span>
          <p className="mt-2 text-gray-500 dark:text-neutral-400 flex">
            <span className="block w-[80%]">
              With supporting text below as a natural lead-in to additional
              content.
            </span>
            <span className="w-14 h-14  border-5 rounded-[50%] border-gray-50 flex justify-center items-center">
              1%
            </span>
          </p>
          <button>
            <CircleChevronRight color="white" />
          </button>
        </div>
            <p className="px-6 pt-4 pb-2 flex justify-around">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#nature</span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#sunset</span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
          </p>
      </article>
    );
}

export default Card;
