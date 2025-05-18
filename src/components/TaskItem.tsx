import type { Task } from "@/types/Task";
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
};

const TaskItem = ({ task, onUpdateTask, onDeleteTask }: TodoItemProps) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [deleteMode, setDeleteMode] = useState<boolean>(false);
  const [taskName, setTaskName] = useState<string>("");

  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    setTaskName(task.details);
    setChecked(task.completed);
  }, [task]);

  const handleEditTask = () => {
    setEditMode((prevState) => !prevState);
  };

  const handleDeleteTask = () => {
    setDeleteMode((prevState) => !prevState);
  };

  const handleConfirmDelete = () => {
    onDeleteTask(task.id);
    setDeleteMode(false);
  };

  const handleEdit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (taskName.trim() !== "" && task.details !== taskName) {
        onUpdateTask({ ...task, ...{ name: taskName, updated: Date.now() } });

        setEditMode(false);
      }
    }
  };

  const handleToggleCheck = () => {
    setChecked((prevState) => !prevState);

    onUpdateTask({
      ...task,
      ...{ completed: !task.completed, updated: Date.now() },
    });
  };

  // ${
  //   task.completed
  //     ? "pointer-events-none opacity-50 bg-zinc-200 border-zinc-600"
  //     : ""
  // }

  return (
    <li
      key={task.id}
      className={`relative

        text-black border border-indigo-900 rounded-sm p-2 mb-2 flex justify-between items-center 
   ${task.completed ? "opacity-50 bg-zinc-200 border-zinc-600" : ""}
        `}
    >
      {/* ${selected ? "bg-blue-400" : "bg-white"} */}
      {/* {task.completed && (
        <hr
          className={`h-px w-[calc(100%+16px)] border-t-[1px] absolute translate-y-1/2 -ml-4
          `}
        />
      )} */}
      <div className="grow-4">
        {editMode && (
          <input
            type="text"
            className="border text-black rounded-sm p-1 "
            value={taskName}
            onKeyDown={handleEdit}
            onChange={(e) => setTaskName(e.target.value)}
          />
        )}

        {deleteMode && (
          <button
            onClick={handleConfirmDelete}
            className="px-4 py-1 border rounded-sm bg-red-300 text-black"
          >
            Delete
          </button>
        )}

        {!deleteMode && !editMode && (
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
            {task.details} - {task.completed ? "true" : "false"}
          </div>
        )}
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleEditTask();
        }}
        disabled={deleteMode || task.completed}
        className={`disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed! border mr-2 rounded-sm p-2 hover:bg-indigo-400 active:bg-indigo-600 hover:text-white focus:outline-1 focus:outline-offset-1 focus:outline-indigo-300`}
      >
        {editMode ? <XIcon size={24} /> : <PencilIcon size={24} />}
      </button>
      <button
        disabled={editMode || task.completed}
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteTask();
        }}
        className={`disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed! border rounded-sm p-2 text-white bg-red-600 hover:bg-red-800 active:bg-red-400 hover:text-white focus:outline-1 focus:outline-offset-1 focus:outline-red-300`}
      >
        {deleteMode ? <XIcon size={24} /> : <TrashIcon size={24} />}
      </button>
    </li>
  );
};

export default TaskItem;
