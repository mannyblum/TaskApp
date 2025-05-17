import type { Task } from "@/types/Task";
import { useEffect, useState } from "react";

import { PencilIcon, TrashIcon, XIcon } from "@primer/octicons-react";

type TodoItemProps = {
  task: Task;
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onClick: () => void;
  selected: boolean;
};

const TaskItem = ({
  task,
  onUpdateTask,
  onDeleteTask,
  onClick,
  selected,
}: TodoItemProps) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [deleteMode, setDeleteMode] = useState<boolean>(false);
  const [taskName, setTaskName] = useState<string>("");

  useEffect(() => {
    setTaskName(task.details);
  }, [task]);

  const handleSelectTask = () => {
    if (editMode || deleteMode) return;

    onClick();
  };

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

  const handleAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (taskName.trim() !== "" && task.details !== taskName) {
        onUpdateTask({ ...task, ...{ name: taskName, updated: Date.now() } });

        setEditMode(false);
      }
    }
  };

  return (
    <li
      key={task.id}
      onClick={(e) => {
        e.stopPropagation();
        handleSelectTask();
      }}
      className={`relative

        text-black border border-indigo-900 rounded-sm p-2 mb-2 flex justify-between items-center cursor-pointer ${
          selected ? "bg-blue-400" : "bg-white"
        }`}
    >
      {task.completed ?? (
        <hr
          className={`h-px w-[calc(100%+16px)] border-t-[1px] absolute translate-y-1/2 -ml-4
          `}
        />
      )}
      <div className="grow-4">
        {editMode && (
          <input
            type="text"
            className="border text-black rounded-sm p-1 "
            value={taskName}
            onKeyDown={handleAdd}
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

        {!deleteMode && !editMode && <>{task.details}</>}
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleEditTask();
        }}
        disabled={deleteMode || selected}
        className={`disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed! border mr-2 rounded-sm p-2 hover:bg-indigo-400 active:bg-indigo-600 hover:text-white focus:outline-1 focus:outline-offset-1 focus:outline-indigo-300`}
      >
        {editMode ? <XIcon size={24} /> : <PencilIcon size={24} />}
      </button>
      <button
        disabled={editMode || selected}
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
