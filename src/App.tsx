import { useState } from "react";

const TodoApp = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [task, setTask] = useState<string>("");

  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTasks((prev) => [...prev, task]);
    ``;
    setTask("");
  };

  return (
    <div>
      <form onSubmit={handleAddTask}>
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="border border-black text-black rounded-sm color p-2 mr-2"
        />
        <button className="text-white bg-indigo-700 rounded-sm p-2 px-4 ">
          Add
        </button>
      </form>
      <ul>
        {tasks.map((t, i) => {
          return (
            <li key={t + "-" + i} className="text-black">
              {t}
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
