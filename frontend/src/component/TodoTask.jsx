import React, { useEffect, useState } from 'react';

const TodoTask = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const initialTodos = [{ id: 1, title: "" },];
  const handleCreateTodo = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newTodo = {  id: Date.now(), title: title.trim(), };
    setTodos([newTodo, ...todos]);
    setTitle("");
  };

  const handleDelete = (id) => {
    const filtered = todos.filter((todo) => todo.id !== id);
    setTodos(filtered);
  };

  const handleEdit = (id) => {
    const taskToEdit = todos.find((todo) => todo.id === id);
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  };

  useEffect(() => {
    setTodos(initialTodos);
  }, []);

  return (
    <div>
      <div className="p-6">
        <h2 className="text-center font-bold mb-4">Notes</h2>

        <form onSubmit={handleCreateTodo} className="flex gap-2 mb-6">
          <input  type="text" placeholder="Enter your todo" value={title} onChange={(e) => setTitle(e.target.value)}/>
          <button type="submit">Add</button>
        </form>

        <ul>
          {todos.length === 0 ? ( <p>Todo list is empty</p> ) : (
            todos.map((todo) => (
              <li key={todo.id} className="mb-2 flex justify-between items-center">
                <span>{todo.title}</span>
                <div>
                  <button className="btn btn-sm btn-warning me-2"  onClick={() => handleEdit(todo.id)}> Edit </button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(todo.id)} > Delete </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default TodoTask;
