import type { Task } from "@/types/Task";
import { useState, type FormEvent } from "react";
import shortUUID from "short-uuid";
import TaskItem from "./TaskItem";

const TaskApp = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

  const [inputValue, setInputValue] = useState<string>("");

  const shortId = shortUUID.generate();

  // TODO Task Management
  //  [x] Add a new Task
  //  [x] Edit an existing task
  //  [x] Delete a task
  //  [x] Mark a task as complete/incomplete
  //  [ ] View all tasks
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

  const toggleSelected = (id: string) => {
    if (selectedTasks.includes(id)) {
      setSelectedTasks((prev) => {
        return prev.filter((i) => i != id);
      });
    } else {
      setSelectedTasks((prev) => {
        return [...prev, id];
      });
    }
  };

  const completeTasks = () => {
    const updatedTasks = tasks.map((task) =>
      selectedTasks.includes(task.id) ? { ...task, completed: true } : task
    );

    setTasks(updatedTasks);
    setSelectedTasks([]);
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
        <button
          onClick={completeTasks}
          className="text-white bg-green-700 rounded-sm p-2 px-4 self-end ml-auto"
        >
          Mark as Completed
        </button>
      </div>
      <ul>
        {[...tasks]
          // .filter((task) => !task.completed)
          .reverse()
          .map((tsk) => {
            return (
              <TaskItem
                key={tsk.id}
                onClick={() => toggleSelected(tsk.id)}
                selected={selectedTasks.includes(tsk.id)}
                onUpdateTask={handleUpdateTask}
                onDeleteTask={handleDeleteTask}
                task={tsk}
              />
            );
          })}
      </ul>
    </div>
  );
};

export default TaskApp;
