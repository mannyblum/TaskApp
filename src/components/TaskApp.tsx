import type { Task } from "@/types/Task";
import { useState } from "react";
import shortUUID from "short-uuid";
import TaskItem from "./TaskItem";

const TaskApp = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("all");

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
  const handleAddTask = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    if ("key" in e && e.key !== "Enter") return;

    if (inputValue.trim() === "") return; // Don't add empty strings

    const newTask: Task = {
      id: shortId,
      details: inputValue,
      created: Date.now(),
      updated: Date.now(),
      completed: false,
    };

    setTasks((tasks) => [...tasks, newTask]);

    setInputValue("");
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

  return (
    <div className="w-6/12">
      <div className="mb-4 flex items-center">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleAddTask}
          className="border border-black text-black rounded-sm p-2 mr-2"
        />
        <button
          onClick={handleAddTask}
          className="text-white bg-indigo-700 rounded-sm p-2 px-4 mr-2 "
        >
          Add
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
    </div>
  );
};

export default TaskApp;
