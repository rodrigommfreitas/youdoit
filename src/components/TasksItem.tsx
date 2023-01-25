import type { FC } from "react";
import type { Task } from "@prisma/client";

type Props = {
  task: Task;
};

const TasksItem: FC<Props> = ({ task }) => {
  return <li className="text-xl text-green-500">{task.title}</li>;
};

export default TasksItem;
