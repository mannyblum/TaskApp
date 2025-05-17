import type { Task } from "@/types/Task";
import { useState } from "react";
import shortUUID from "short-uuid";
import TaskItem from "./TaskItem";

const TASK_DEFAULTS = {
  id: "",
  details: "",
  created: Date.now(),
  updated: Date.now(),
  completed: false,
};

const TaskApp = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<Task>(TASK_DEFAULTS);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

  const shortId = shortUUID.generate();

  // TODO Task Management
  //  [x] Add a new Task
  //  [x] Edit an existing task
  //  [x] Delete a task
  //  [ ] Mark a task as complete/incomplete
  //  [ ] View all tasks
  const handleAddTask = () => {
    if (task) {
      const newTask: Task = {
        id: shortId,
        details: task.details,
        created: Date.now(),
        updated: Date.now(),
        completed: false,
      };

      // add new task to array of tasks
      setTasks([...tasks, newTask]);

      // clear task object
      setTask(TASK_DEFAULTS);
    }
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
    console.log("selectedTasks", selectedTasks);

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
          value={task.details}
          onChange={(e) =>
            setTask((prevTask) => ({ ...prevTask, details: e.target.value }))
          }
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
          .filter((task) => !task.completed)
          .reverse()
          .map((tsk) => {
            return (
              <TaskItem
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
