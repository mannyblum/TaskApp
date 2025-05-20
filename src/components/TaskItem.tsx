import type { Task } from "../types/Task";
import { useEffect, useState } from "react";

import {
  CheckIcon,
  PencilIcon,
  TrashIcon,
  XIcon,
} from "@primer/octicons-react";

type TodoItemProps = {
  task: Task;
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onEditTask: (task: Task) => void;
};

const TaskItem = ({
  task,
  onUpdateTask,
  onDeleteTask,
  onEditTask,
}: TodoItemProps) => {
  const [deleteMode, setDeleteMode] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    setChecked(task.completed);
  }, [task]);

  const handleDeleteTask = () => {
    setDeleteMode((prevState) => !prevState);
  };

  const handleConfirmDelete = () => {
    onDeleteTask(task.id);
    setDeleteMode(false);
  };

  const handleEdit = () => {
    onEditTask(task);
  };

  const handleToggleCheck = () => {
    setChecked((prevState) => !prevState);

    onUpdateTask({
      ...task,
      ...{ completed: !task.completed, updated: Date.now() },
    });
  };

  return (
    <li
      key={task.id}
      className={`relative
        text-black border-b-2 border-b-black last:border-b-0 p-2  flex justify-between items-center 
        ${task.completed ? "opacity-50 bg-zinc-200 " : ""}
      `}
    >
      <div className="grow-4">
        {deleteMode && (
          <button
            onClick={handleConfirmDelete}
            className="px-4 py-1 border rounded-sm bg-red-300 text-black"
          >
            Delete
          </button>
        )}

        {!deleteMode && (
          <div className="mr-4 flex items-center">
            <div className="flex items-center cursor-pointer mr-4">
              <input
                type="checkbox"
                className="appearance-none cursor-pointer checked:shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] checked:bg-green-400 w-5 h-5 rounded-full border-2 border-black bg-white"
                onChange={handleToggleCheck}
                checked={checked}
              />
              {checked && (
                <CheckIcon
                  className="absolute w-3 h-3 mx-1 pointer-events-none"
                  size={16}
                />
              )}
            </div>
            {task.details}
          </div>
        )}
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();

          handleEdit();
        }}
        disabled={deleteMode || task.completed}
        className={`disabled:bg-gray-50 border-black hover:border-black! disabled:text-gray-500 disabled:cursor-not-allowed! border-2 mr-2 rounded-sm p-2 hover:bg-indigo-400 active:bg-indigo-600 hover:text-white shadow-[2px_2px_0px_rgba(0,0,0,1)]`}
      >
        <PencilIcon size={24} />
      </button>
      <button
        disabled={task.completed}
        onClick={(e) => {
          e.stopPropagation();

          handleDeleteTask();
        }}
        className={`disabled:bg-gray-50 border-black hover:border-black! disabled:text-gray-500 disabled:cursor-not-allowed! border-2 rounded-sm p-2 text-white bg-red-600 hover:bg-red-800 active:bg-red-400 hover:text-white shadow-[2px_2px_0px_rgba(0,0,0,1)]`}
      >
        {deleteMode ? <XIcon size={24} /> : <TrashIcon size={24} />}
      </button>
    </li>
  );
};

export default TaskItem;
