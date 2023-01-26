import type { FC } from "react";
import type { Task } from "@prisma/client";
import ImportantIcon from "./Icons/ImportantIcon";
import CompleteIcon from "./Icons/CompleteIcon";
import CloseIcon from "./Icons/CloseIcon";

type Props = {
  task: Task;
};

const TasksItem: FC<Props> = ({ task }) => {
  return (
    <li className="flex items-center justify-between sm:text-xl">
      <div className="flex max-w-[175px] items-center gap-1 sm:max-w-none sm:gap-2">
        <span className="w-max text-danube-700 ">{task.title}</span>
        {task.important && (
          <i className="h-fit w-fit text-yellow-500">
            <ImportantIcon />
          </i>
        )}
      </div>

      <div className="mx-4 h-[1px] w-full bg-danube-100"></div>

      <div className="flex items-center">
        <button className="mr-2 h-fit w-fit rounded-full p-1 text-emerald-500 transition hover:bg-gray-100 active:scale-95 active:bg-gray-200">
          <CompleteIcon />
        </button>
        <button className="h-fit w-fit rounded-full p-1 font-bold text-orange-600 transition hover:bg-gray-100 active:scale-95 active:bg-gray-200">
          <CloseIcon />
        </button>
      </div>
    </li>
  );
};

export default TasksItem;
