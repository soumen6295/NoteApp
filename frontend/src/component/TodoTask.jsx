import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const TodoTask = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const initialTodos = [
    { id: 1, title: "Sample Task", description: "This is a sample note" },
  ];

  const handleCreateTodo = (e) => {
    e.preventDefault();
    if (!title.trim() && !description.trim()) return;

    const newTodo = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
    };

    setTodos([newTodo, ...todos]);
    setTitle("");
    setDescription("");
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (id) => {
    const taskToEdit = todos.find((todo) => todo.id === id);
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  };

  useEffect(() => {
    setTodos(initialTodos);
  }, []);

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 text-primary fw-bold">📒 Notes App</h2>
      <form onSubmit={handleCreateTodo} className="card shadow p-4 mb-4 border-0"  >
        <div className="row g-3">
          <div className="col-md-5">
            <input type="text" className="form-control" placeholder="Enter note title" value={title} onChange={(e) => setTitle(e.target.value)}  />
          </div>
          <div className="col-md-5">
            <input type="text" className="form-control" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)}   />
          </div>
          <div className="col-md-2 d-grid">
            <button type="submit" className="btn btn-success">  ➕ Add Note  </button>
          </div>
        </div>
      </form>

     
      <div className="row">
        {todos.length === 0 ? (
          <p className="text-center text-muted">No notes available.</p>
        ) : (
          todos.map((todo) => (
            <div className="col-md-4 mb-3" key={todo.id}>
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body">
                  <h5 className="card-title text-primary">{todo.title}</h5>
                  <p className="card-text text-muted">{todo.description}</p>
                  <div className="d-flex justify-content-end gap-2">
                    <button className="btn btn-warning btn-sm"  onClick={() => handleEdit(todo.id)} > ✏️ Edit </button>
                    <button className="btn btn-danger btn-sm"  onClick={() => handleDelete(todo.id)}  >  🗑️ Delete  </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodoTask;
