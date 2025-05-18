import { useState } from "react";

type ModalProps = {
  onClose: () => void;
  onAddTask: (task: string) => void;
};

const Modal = ({ onClose, onAddTask }: ModalProps) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleAddTask = () => {
    onAddTask(inputValue);
    onClose();
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
              <h3 className="text-xl font-semibold text-gray-900">Add Task</h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="static-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="py-2 px-6 pb-4 flex flex-col">
              <label htmlFor="task" className="text-sm py-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Task"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="border-2 border-black w-full rounded-sm py-2 px-1 focus:ring-2 focus:ring-offset-2 focus:ring-black focus:outline-hidden"
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
                onClick={handleAddTask}
                disabled={inputValue.length > 0 ? false : true}
                className="shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-0.5 disabled:shadow-[2px_2px_0px_rgba(0,0,0,.5)]  disabled:translate-0 text-white disabled:cursor-not-allowed! disabled:bg-zinc-500/50 disabled:text-black border-2 border-black! bg-green-700 focus:outline-hidden focus:ring-green-300 font-medium rounded-sm text-sm px-5 py-2.5 text-center"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
