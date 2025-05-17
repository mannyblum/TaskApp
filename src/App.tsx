import { useEffect, useState } from "react";
import shortUUID from "short-uuid";

import { PencilIcon } from "@primer/octicons-react";

type Task = {
  id: string;
  name: string;
  created: number;
  updated: number;
};

const Task_Defaults = {
  id: "",
  name: "",
  created: Date.now(),
  updated: Date.now(),
};

type TodoItemProps = {
  task: Task;
  onUpdateTask: (task: Task) => void;
};

const TodoItem = ({ task, onUpdateTask }: TodoItemProps) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [taskName, setTaskName] = useState<string>("");

  useEffect(() => {
    setTaskName(task.name);
  }, [task]);

  const handleEditTask = () => {
    setEditMode(() => !editMode);
  };

  useEffect(() => {
    if (editMode) {
      if (task.name !== taskName) {
        onUpdateTask({ ...task, ...{ name: taskName, updated: Date.now() } });
      }
    }
  }, [editMode]);

  return (
    <li
      key={task.id}
      className="text-black border border-indigo-900 rounded-sm p-2 mb-2 flex justify-between items-center"
    >
      {!editMode ? (
        <>{task.name}</>
      ) : (
        <input
          type="text"
          className="border text-black rounded-sm p-1 "
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
      )}
      <button
        onClick={handleEditTask}
        className={`border rounded-sm p-2 hover:bg-indigo-400 active:bg-indigo-600 hover:text-white focus:outline-1 focus:outline-offset-1 focus:outline-indigo-300`}
      >
        <PencilIcon size={24} />
      </button>
    </li>
  );
};

const TodoApp = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<Task>(Task_Defaults);

  const shortId = shortUUID.generate();

  // TODO Task Management
  //  [x] Add a new Task
  //  [x] Edit an existing task
  //  [ ] Delete a task
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
      setTask(Task_Defaults);
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
          return <TodoItem onUpdateTask={handleUpdateTask} task={tsk} />;
        })}
      </ul>
    </div>
  );
};

function App() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      TodoApp
      <TodoApp />
    </div>
  );
}

export default App;
