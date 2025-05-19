import type { Task } from "@/types/Task";
import { useState } from "react";
import shortUUID from "short-uuid";
import TaskItem from "./TaskItem";
import { ChevronDownIcon, GearIcon } from "@primer/octicons-react";
import Modal from "./modals/TaskModal";

const TaskApp = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filterType, setFilterType] = useState<string>("all");
  const [category, setCategory] = useState<string>("Categories");
  const [isSelectOpen, setSelectOpen] = useState<boolean>(false);
  const [isTaskModalOpen, setTaskModalOpen] = useState<boolean>(false);

  const shortId = shortUUID.generate();

  // TODO Task Management
  //  [x] Add a new Task
  //  [x] Edit an existing task
  //  [x] Delete a task
  //  [x] Mark a task as complete/incomplete
  //  [x] View all tasks

  // TODO:  Category Support
  //  [ ] Add a new category
  //  [ ] Assign a task to a category
  //  [ ] Filter tasks by category

  // TODO: Basic State Management
  //  [ ] Use React state (useState, useReducer, or Context) to manage tasks and categories

  // TODO: UI/UX Essentials
  //  [ ] Clear, responsive layout using CSS or a CSS framework (like Tailwind or Material UI)
  //  [ ] Basic styling with status indicators (e.g. strikethrough completed tasks)

  const handleAddTaskFromModal = (task: string) => {
    if (task.trim() === "") return; // Don't add empty strings

    const newTask: Task = {
      id: shortId,
      details: task,
      created: Date.now(),
      updated: Date.now(),
      completed: false,
    };

    setTasks((tasks) => [...tasks, newTask]);
  };

  const handleUpdateTask = (task: Task) => {
    setTasks((prevTasks) => {
      const existingTask = prevTasks.find((task) => task.id === task.id);

      if (existingTask && task.updated <= existingTask.updated) {
        return prevTasks;
      }

      const updatedTasks = prevTasks.map((tsk) =>
        tsk.id === task.id ? task : tsk
      );

      const isNew = !existingTask;
      return isNew ? [...prevTasks, task] : updatedTasks;
    });
  };

  const handleDeleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);

    setTasks(updatedTasks);
  };

  const clearCompletedTasks = () => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.completed !== true)
    );
  };

  const handleFilter = (type: string) => {
    setFilterType(type);
  };

  const toggleOpenDropdown = () => {
    setSelectOpen((prev) => !prev);
  };

  const handleSetCategory = (cat: string) => {
    setCategory(cat);
    setSelectOpen(false);
  };

  const handleOpenTaskModal = () => {
    setTaskModalOpen(true);
  };

  return (
    <div className="w-6/12">
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={handleOpenTaskModal}
          className="
                shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:border-black! hover:shadow-none hover:translate-0.5 
          text-black bg-indigo-200 border-2 border-black rounded-sm p-2 px-4 mr-2 "
        >
          Add Task
        </button>
        <div className="w-48 relative">
          <button
            id="categories-button"
            data-dropdown-toggle="dropdown-states"
            onClick={toggleOpenDropdown}
            className="mb-2 flex items-center mt-2 justify-between w-full hover:border-black! border-2 border-black text-black rounded-sm p-2 px-4 shadow-[2px_2px_0px_rgba(0,0,0,1)]"
          >
            {category}
            <ChevronDownIcon size={16} className="text-black font-black" />
          </button>
          {isSelectOpen && (
            <ul className="rounded-sm absolute top-3 left-0 bg-white mt-12 z-20 text-black w-full cursor-pointer border-2 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              <li
                onClick={() => handleSetCategory("Cats")}
                className="border-b-2 border-b-black hover:bg-green-400 p-1 px-4"
              >
                Cat
              </li>
              <li
                onClick={() => handleSetCategory("Dog")}
                className="border-b-2 border-b-black hover:bg-green-500 p-1 px-4"
              >
                Dog
              </li>
              <li
                onClick={() => handleSetCategory("Mouse")}
                className="border-b-2 border-b-black hover:bg-green-500 p-1 px-4"
              >
                Mouse
              </li>
            </ul>
          )}
        </div>
        <button
          id="settings"
          className="text-black border-2 border-black hover:border-black! rounded-sm p-2 px-4 shadow-[2px_2px_0px_rgba(0,0,0,1)]"
        >
          <GearIcon size={24} />
        </button>
      </div>
      {tasks.length === 0 ? (
        <div className="text-center font-black border text-black text-xs rounded-sm flex place-content-center p-2 px-4 mb-2">
          No tasks
        </div>
      ) : (
        <ul>
          {[...tasks]
            .filter((task) => {
              if (filterType === "completed") {
                return task.completed;
              }

              if (filterType === "active") {
                return !task.completed;
              }

              return task;
            })
            .reverse()
            .map((tsk) => {
              return (
                <TaskItem
                  key={tsk.id}
                  onUpdateTask={handleUpdateTask}
                  onDeleteTask={handleDeleteTask}
                  task={tsk}
                />
              );
            })}
        </ul>
      )}
      {tasks.length > 0 && (
        <div className="border text-black text-xs rounded-sm flex justify-between items-center p-2 px-4">
          <div>{tasks.filter((task) => !task.completed).length} items left</div>
          <div>
            <ul className="flex gap-4 cursor-pointer">
              <li
                className={`${
                  filterType === "all" ? "text-green-800 font-black" : ""
                } hover:font-black`}
                onClick={() => handleFilter("all")}
              >
                All
              </li>
              <li
                className={`${
                  filterType === "active" ? "text-green-800 font-black" : ""
                } hover:font-black`}
                onClick={() => handleFilter("active")}
              >
                Active
              </li>
              <li
                className={`${
                  filterType === "completed" ? "text-green-800 font-black" : ""
                } hover:font-black`}
                onClick={() => handleFilter("completed")}
              >
                Completed
              </li>
            </ul>
          </div>
          <div
            className="hover:font-black cursor-pointer"
            onClick={clearCompletedTasks}
          >
            Clear Completed
          </div>
        </div>
      )}
      {isTaskModalOpen && (
        <Modal
          onClose={() => setTaskModalOpen(false)}
          onSubmit={(task) => handleAddTaskFromModal(task)}
          onCancel={() => setTaskModalOpen(false)}
        />
      )}
    </div>
  );
};

export default TaskApp;
