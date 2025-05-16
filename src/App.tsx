import { useState } from "react";

type Task = {
  name: string;
  id: number;
};

const TodoApp = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<Task>({ name: "", id: 0 });

  // TODO Task Management
  //  [x] Add a new Task
  //  [ ] Edit an existing task
  //  [ ] Delete a task
  //  [ ] Mark a task as complete/incomplete
  //  [ ] View all tasks
  const handleAddTask = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTask: Task = {
      id: Date.now(),
      name: task.name,
    };

    // add new task to array of tasks
    setTasks([...tasks, newTask]);

    // clear task object
    setTask({ name: "", id: 0 });
  };

  return (
    <div>
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
        {tasks.map((t, i) => {
          return (
            <li
              key={t + "-" + i}
              className="text-black border border-indigo-900 rounded-sm p-2 mb-2"
            >
              {t.name}
            </li>
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
