import type { Task } from "../types/Task";
import { useEffect, useState } from "react";

import { useLocalStorage } from "./hooks/useLocalStorage";

import CategorySelect from "./CategorySelect";
import TaskItem from "./TaskItem";
import TaskModal from "./modals/TaskModal";

const TaskApp = () => {
  const [task, setTask] = useState<Task | undefined>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filterType, setFilterType] = useState<string>("all");

  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const [isTaskModalOpen, setTaskModalOpen] = useState<boolean>(false);

  const [lsTasks, setLSTasks] = useLocalStorage("tasks", "");

  // TODO Task Management
  //  [x] Add a new Task
  //  [x] Edit an existing task
  //  [x] Delete a task
  //  [x] Mark a task as complete/incomplete
  //  [x] View all tasks

  // TODO:  Category Support
  //  [x] Add a new category
  //  [x] Assign a task to a category
  //  [x] Filter tasks by category

  // TODO: Basic State Management
  //  [x] Use React state (useState, useReducer, or Context) to manage tasks and categories

  // TODO: UI/UX Essentials
  //  [ ] Clear, responsive layout using CSS or a CSS framework (like Tailwind or Material UI)
  //  [ ] Basic styling with status indicators (e.g. strikethrough completed tasks)

  // TODO: Task Filtering and Sorting
  //  [x] Filter tasks: All / Active / Completed
  //  [ ] Sort tasks by due date, category, or priority (if implemented)
  //  [ ] Search tasks by name

  // TODO: Persistence
  //  [x] Save tasks and categories in localStorage so they persist on refresh
  //  [ ] Option to clear all tasks

  // TODO: Due Dates & Priorities
  //  [ ] Assign a due date to each task
  //  [ ] Set a priority level (e.g. Low, Medium, High)
  //  [ ] Highlight overdue tasks visually

  const handleTaskModalSubmit = (task?: Task) => {
    if (!task) {
      console.error("no task from submit");
      return;
    }

    const taskIndex = tasks.findIndex((tsk) => tsk.id === task.id);

    if (taskIndex > -1) {
      const updatedTasks = tasks.map((tsk) =>
        tsk.id === task.id ? { ...tsk, ...task } : tsk
      );

      setLSTasks(updatedTasks);
    } else {
      setLSTasks((prevTasks: Task[]) => [...prevTasks, task]);
    }
  };

  useEffect(() => {
    if (lsTasks) {
      setTasks(lsTasks);
    }
  }, [lsTasks]);

  const handleUpdateTask = (task: Task) => {
    setLSTasks((prevTasks: Task[]) => {
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

    setLSTasks(updatedTasks);
  };

  const handleEditTask = (task: Task) => {
    setTask(task);
    setTaskModalOpen(true);
  };

  const handleCloseTaskModal = () => {
    setTaskModalOpen(false);
    setTask(undefined);
  };

  const clearCompletedTasks = () => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.completed !== true)
    );
  };

  const handleFilter = (type: string) => {
    setFilterType(type);
  };

  const handleOpenTaskModal = () => {
    setTaskModalOpen(true);
  };

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const availableItems = tasks.filter((task) => {
    if (selectedCategory.length > 0) {
      return task.categoryId === selectedCategory;
    }

    return task;
  });

  return (
    <div className="w-[500px] bg-white p-4 rounded-sm shadow-[5px_5px_0px_rgba(0,0,0,1)]">
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={handleOpenTaskModal}
          className="
                shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:border-black! hover:shadow-none hover:translate-0.5 
          text-black bg-indigo-200 border-2 border-black rounded-sm p-2 px-4 mr-2 "
        >
          Add Task
        </button>
        <CategorySelect
          onSelectCategory={(categoryId) => handleSelectCategory(categoryId)}
        />
        {/* <button
          id="settings"
          className="text-black border-2 border-black hover:border-black! rounded-sm p-2 px-4 shadow-[2px_2px_0px_rgba(0,0,0,1)]"
        >
          <GearIcon size={24} />
        </button> */}
      </div>
      {tasks.length === 0 || availableItems.length === 0 ? (
        <div className="text-center font-black border-2 text-black text-xs rounded-sm flex place-content-center p-2 px-4 mb-4 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
          No tasks Available
        </div>
      ) : (
        <div
          id="task-list"
          className="max-h-[350px] overflow-y-auto mb-4 border-black border-2 rounded-sm shadow-[2px_2px_0px_rgba(0,0,0,1)]"
        >
          <ul>
            {[...tasks]
              .filter((task) => {
                if (selectedCategory.length) {
                  return task.categoryId === selectedCategory;
                }

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
                    onEditTask={handleEditTask}
                    task={tsk}
                  />
                );
              })}
          </ul>
        </div>
      )}
      {tasks.length > 0 && (
        <div className="border-2 text-black text-xs rounded-sm flex justify-between items-center p-2 px-4 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
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
        <TaskModal
          task={task}
          onClose={() => handleCloseTaskModal()}
          onSubmit={(task) => handleTaskModalSubmit(task)}
          onCancel={() => handleCloseTaskModal()}
        />
      )}
    </div>
  );
};

export default TaskApp;
