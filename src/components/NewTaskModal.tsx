/* eslint-disable @typescript-eslint/no-misused-promises */
import type { Task } from "@prisma/client";
import { useSession } from "next-auth/react";
import {
  type FC,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import { api } from "../utils/api";
import CloseIcon from "./Icons/CloseIcon";

type Props = {
  toggleModal: () => void;
  setTasks: Dispatch<SetStateAction<Task[]>>;
};

const NewTaskModal: FC<Props> = ({ toggleModal, setTasks }) => {
  const { data: session } = useSession();

  const [title, setTitle] = useState<string>("");
  const [showIsEmptyError, setShowIsEmptyError] = useState<boolean>(false);
  const [important, setImportant] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, toggleModal);

  const { mutate: addTask } = api.task.addTask.useMutation({
    onSuccess(task) {
      setTasks((prev) => [...prev, task as Task]);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title === "") {
      setShowIsEmptyError(true);
      return;
    }
    setShowIsEmptyError(false);

    try {
      addTask({
        title: title,
        important: important,
        user: {
          connect: {
            id: session?.user?.id as string,
          },
        },
      });
      toggleModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/75">
      <div ref={ref} className="z-10 w-80 rounded-xl bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-danube-900">Add a new task</h1>
          <button
            className="h-fit w-fit rounded-full p-2 transition hover:bg-gray-200 active:scale-95 active:bg-gray-300"
            onClick={toggleModal}
          >
            <CloseIcon height="1.25em" width="1.25em" />
          </button>
        </div>

        <form
          onSubmit={(e) => handleSubmit(e)}
          className="mt-6 flex flex-col gap-3"
        >
          <div className="flex flex-col gap-1">
            <label
              htmlFor="title"
              className="block text-lg font-medium text-danube-900"
            >
              Title *
            </label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              required
              type="text"
              name="title"
              id="title"
              placeholder="Enter a title"
              autoComplete="off"
              className="w-full rounded-md bg-gray-200 px-2 py-1 shadow-sm  focus:border-danube-500 focus:ring-danube-500"
            />
          </div>

          <div className="flex items-center gap-4">
            <label
              htmlFor="important"
              className="block text-lg font-medium text-danube-900"
            >
              Important
            </label>
            <input
              onChange={(e) => setImportant(e.target.checked)}
              type="checkbox"
              name="important"
              id="important"
              className="h-4 w-4 rounded-md border-gray-300 bg-gray-200 px-2 shadow-sm"
            />
          </div>

          <div className="mt-2 flex flex-col items-center justify-center gap-6">
            {showIsEmptyError && (
              <span className="text-red-600">Please specify a title</span>
            )}
            <button
              type="submit"
              className="flex w-full justify-center rounded-lg bg-danube-500 px-6 py-2 font-semibold text-white transition hover:bg-danube-600 active:bg-danube-700"
            >
              Add task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTaskModal;
