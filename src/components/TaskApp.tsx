import type { Task } from "@/types/Task";
import { useState } from "react";
import shortUUID from "short-uuid";
import TaskItem from "./TaskItem";

const TASK_DEFAULTS = {
  id: "",
  name: "",
  created: Date.now(),
  updated: Date.now(),
};

const TaskApp = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<Task>(TASK_DEFAULTS);

  const shortId = shortUUID.generate();

  // TODO Task Management
  //  [x] Add a new Task
  //  [x] Edit an existing task
  //  [x] Delete a task
  //  [ ] Mark a task as complete/incomplete
  //  [ ] View all tasks
  const handleAddTask = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (task) {
      const newTask: Task = {
        id: shortId,
        name: task.name,
        created: Date.now(),
        updated: Date.now(),
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

  return (
    <div className="w-6/12">
      <form onSubmit={handleAddTask} className="mb-4">
        <input
          value={task.name}
          onChange={(e) =>
            setTask((prevTask) => ({ ...prevTask, name: e.target.value }))
          }
          className="border border-black text-black rounded-sm p-2 mr-2"
        />
        <button className="text-white bg-indigo-700 rounded-sm p-2 px-4 ">
          Add
        </button>
      </form>
      <ul>
        {tasks.map((tsk) => {
          return (
            <TaskItem
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
