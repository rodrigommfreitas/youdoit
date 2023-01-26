import type { Dispatch, FC, SetStateAction } from "react";
import type { Task } from "@prisma/client";
import ImportantIcon from "./Icons/ImportantIcon";
import CompleteIcon from "./Icons/CompleteIcon";
import CloseIcon from "./Icons/CloseIcon";
import { api } from "../utils/api";
import { motion } from "framer-motion";

type Props = {
  task: Task;
  setTasks: Dispatch<SetStateAction<Task[]>>;
  completedTasks: Task[];
  setCompletedTasks: Dispatch<SetStateAction<Task[]>>;
};

const TasksItem: FC<Props> = ({
  task,
  setTasks,
  completedTasks,
  setCompletedTasks,
}) => {
  const { mutate: completeTask } = api.task.completeTask.useMutation({
    onSuccess(task) {
      setCompletedTasks((prev) => [...prev, task as Task]);
    },
  });

  const { mutate: deleteTask } = api.task.deleteTask.useMutation({
    onSuccess(task) {
      setTasks((prev) => prev.filter((item) => item.id !== task?.id));
    },
  });

  return (
    <li className="flex items-center justify-between sm:text-xl">
      <div className="flex max-w-[175px] items-center gap-1 sm:max-w-none sm:gap-2">
        <span className="relative w-max text-danube-700">
          {" "}
          <div className="pointer-events-none absolute inset-0 flex origin-left items-center justify-center">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: completedTasks.some((item) => item.id === task.id)
                  ? "100%"
                  : 0,
              }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="h-[2px] w-full translate-y-px bg-orange-600"
            />
          </div>
          {task.title}
        </span>
        {task.important && (
          <i className="h-fit w-fit text-yellow-500">
            <ImportantIcon />
          </i>
        )}
      </div>

      <div className="mx-4 h-[1px] w-full bg-danube-100"></div>

      <div className="flex items-center">
        {!completedTasks.some((item) => item.id === task.id) && (
          <button
            onClick={() => {
              completeTask({
                id: task.id,
                isCompleted: completedTasks.some((item) => item.id === task.id)
                  ? false
                  : true,
              });
            }}
            className="mr-2 h-fit w-fit rounded-full p-1 text-emerald-500 transition hover:bg-gray-100 active:scale-95 active:bg-gray-200"
          >
            <CompleteIcon />
          </button>
        )}
        <button
          onClick={() =>
            deleteTask({
              id: task.id,
            })
          }
          className="h-fit w-fit rounded-full p-1 font-bold text-orange-600 transition hover:bg-gray-100 active:scale-95 active:bg-gray-200"
        >
          <CloseIcon />
        </button>
      </div>
    </li>
  );
};

export default TasksItem;
