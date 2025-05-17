import { useEffect, useState } from "react";
import shortUUID from "short-uuid";

import { PencilIcon, TrashIcon, XIcon } from "@primer/octicons-react";

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
  onDeleteTask: (taskId: string) => void;
};

const TodoItem = ({ task, onUpdateTask, onDeleteTask }: TodoItemProps) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [deleteMode, setDeleteMode] = useState<boolean>(false);
  const [taskName, setTaskName] = useState<string>("");

  useEffect(() => {
    setTaskName(task.name);
  }, [task]);

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
      if (taskName.trim() !== "" && task.name !== taskName) {
        onUpdateTask({ ...task, ...{ name: taskName, updated: Date.now() } });

        setEditMode(false);
      }
    }
  };

  return (
    <li
      key={task.id}
      className="text-black border border-indigo-900 rounded-sm p-2 mb-2 flex justify-between items-center"
    >
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

        {!deleteMode && !editMode && <>{task.name}</>}
      </div>
      <button
        onClick={handleEditTask}
        disabled={deleteMode}
        className={`disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed! border mr-2 rounded-sm p-2 hover:bg-indigo-400 active:bg-indigo-600 hover:text-white focus:outline-1 focus:outline-offset-1 focus:outline-indigo-300`}
      >
        {editMode ? <XIcon size={24} /> : <PencilIcon size={24} />}
      </button>
      <button
        disabled={editMode}
        onClick={handleDeleteTask}
        className={`disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed! border rounded-sm p-2 text-white bg-red-600 hover:bg-red-800 active:bg-red-400 hover:text-white focus:outline-1 focus:outline-offset-1 focus:outline-red-300`}
      >
        {deleteMode ? <XIcon size={24} /> : <TrashIcon size={24} />}
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
            <TodoItem
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

function App() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      TodoApp
      <TodoApp />
    </div>
  );
}

export default App;
