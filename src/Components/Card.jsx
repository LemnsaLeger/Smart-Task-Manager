import { CircleChevronRight, PencilLine, Trash } from "lucide-react";
const Card = ({
  onClick,
  title,
  description,
  percentageComplete,
  createdAt,
  hashTags = [],
  deleteItem,
  updateItem
}) => {
  return (
    <article
      className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70"
    >
      <div className="p-4 md:p-5 flex flex-col gap-3 relative">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white capitalize">
          {title}
        </h3>
        <span className="text-amber-50 absolute text-sm right-2 top-4.5">
         {createdAt}
        </span>
        <p className="mt-2 text-gray-500 dark:text-neutral-400 flex">
          <span className="block w-[80%]">{description}.</span>
          <span className="w-14 h-14  border-5 rounded-[50%] border-gray-50 flex justify-center items-center">
            {percentageComplete}%
          </span>
        </p>
        <button onClick={() => onClick()}>
          <CircleChevronRight color="white" />
        </button>
      </div>
      <p className="ml-4 flex gap-4 ">
        <button
          onClick={deleteItem}
          className="text-white text-sm"
        >
          <Trash size={30}/>
        </button>
        <button
          onClick={() => {
            updateItem();
          }}
          className="text-white text-sm"
        >
          <PencilLine size={30}/>
        </button>
      </p>
      <p className="px-6 pt-4 pb-2 flex justify-start flex-wrap">
        {/* <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #nature
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #sunset
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #photography
          </span> */}
        {hashTags.map((tag, id) => {
          return (
            <span
              key={id}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              {tag}
            </span>
          );
        })}
      </p>
    </article>
  );
};

export default Card;
