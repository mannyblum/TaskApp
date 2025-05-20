import { useEffect, useState } from "react";
import TextField from "../form/TextField";
import type { Task } from "../../types/Task";
import shortUUID from "short-uuid";
import CategorySelect from "../CategorySelect";

type TaskModalProps = {
  task?: Task;
  onClose: () => void;
  onCancel: () => void;
  onSubmit: (task: Task) => void;
};

const TaskModal = ({ onClose, onSubmit, task }: TaskModalProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isNew, setNew] = useState<boolean>(true);
  const [category, setCategory] = useState<string>("");

  useEffect(() => {
    if (task) {
      setInputValue(task.details);
      setCategory(task.categoryId);
      setNew(false);
    }
  }, [task]);

  const handleSubmit = () => {
    if (inputValue.trim() === "") return; // Don't add empty strings

    if (isNew) {
      const shortId = shortUUID.generate();
      const newTask: Task = {
        id: shortId,
        details: inputValue,
        created: Date.now(),
        updated: Date.now(),
        completed: false,
        categoryId: category,
      };

      onSubmit(newTask);
    } else {
      if (!task) {
        console.error("No task provided for update.");
        return;
      }

      const updatedTask = {
        ...task,
        ...{ details: inputValue, updated: Date.now(), categoryId: category },
      };

      onSubmit(updatedTask);
    }

    onClose();
  };

  const handleSelectCategory = (cat: string) => {
    setCategory(cat);
  };

  return (
    <div className="text-black">
      <div
        id="static-modal"
        data-modal-backdrop="static"
        tabIndex={-1}
        aria-hidden="true"
        className="bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50 flex justify-center items-center w-full md:inset-0 h-full max-h-full"
      >
        <div className="relative p-4 m-w-[400] min-w-md max-h-full">
          <div className="relative shadow-[2px_2px_0px_rgba(0,0,0,1)] bg-white rounded-sm border-2 border-black">
            <div className="flex items-center justify-between py-2 px-6">
              <h3 className="text-xl font-semibold text-gray-900">
                {isNew ? "Add" : "Edit"} Task
              </h3>
            </div>
            <TextField
              onChange={(val) => setInputValue(val)}
              value={inputValue}
              label="Name"
              placeholder="Task"
            />
            <div className="py-2 px-6 pb-4 flex flex-col">
              <CategorySelect
                full
                selectOnly
                categoryId={category}
                onSelectCategory={(cat) => handleSelectCategory(cat)}
              />
            </div>
            <div className="flex justify-end items-center px-6 py-2 pb-4 ">
              <button
                data-modal-hide="static-modal"
                type="button"
                onClick={onClose}
                className="shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-0.5 py-2.5 px-5 ms-3 mr-4 text-sm font-black text-black border-2 border-black! bg-white focus:outline-none bg-none rounded-sm hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100"
              >
                Cancel
              </button>
              <button
                data-modal-hide="static-modal"
                type="button"
                disabled={inputValue.length === 0}
                onClick={handleSubmit}
                className="shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-0.5 disabled:shadow-[2px_2px_0px_rgba(0,0,0,.5)]  disabled:translate-0 text-white disabled:cursor-not-allowed! disabled:bg-zinc-500/50 disabled:text-black border-2 border-black! bg-green-700 focus:outline-hidden focus:ring-green-300 font-medium rounded-sm text-sm px-5 py-2.5 text-center"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
