import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  title: yup.string().required("Title is required").min(3, "Minimum 3 characters")
});

const TodoTask = () => {
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("all");

  const { register, handleSubmit, reset, formState: { errors, isSubmitting }, } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { title: "", description: "" },
  });

  const initialTodos = [
    { id: 1, title: "Sample Task", description: "Example description", completed: false },
  ];

  useEffect(() => {
    setTodos(initialTodos);
  }, []);

  const onSubmit = (data) => {
    const newTodo = {
      id: editId || Date.now(),
      title: data.title.trim(),
      description: data.description.trim(),
      completed: false,
    };

    if (editId) {
      setTodos((prev) => [newTodo, ...prev]);
      setEditId(null);
    } else {
      setTodos((prev) => [newTodo, ...prev]);
    }
    reset({ title: "", description: "" });
  };

  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    if (editId === id) {
      setEditId(null);
      reset({ title: "", description: "" });
    }
  };

  const handleEdit = (id) => {
    const taskToEdit = todos.find((todo) => todo.id === id);
    if (taskToEdit) {
      reset({ title: taskToEdit.title, description: taskToEdit.description });
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
      setEditId(id);
    }
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 text-primary fw-bold">Notes App</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="card shadow p-4 mb-4 border-0" noValidate >
        <div className="row g-3">
          <div className="col-md-4">
            <input type="text" className={`form-control ${errors.title ? "is-invalid" : ""}`} placeholder="Enter note title" {...register("title")} />
            <div className="invalid-feedback">{errors.title?.message}</div>
          </div>

          <div className="col-md-5">
            <input
              type="text" className={`form-control ${errors.description ? "is-invalid" : ""}`} placeholder="Enter description" {...register("description")} />
            <div className="invalid-feedback">{errors.description?.message}</div>
          </div>

          <div className="col-md-3 d-grid">
            <button type="submit" className="btn btn-success" disabled={isSubmitting}>  {editId ? " Update Note" : "Add Note"}  </button>
          </div>
        </div>
      </form>

      <div className="d-flex justify-content-center gap-2 mb-4">
        <button className={`btn ${filter === "all" ? "btn-primary" : "btn-outline-primary"}`} onClick={() => setFilter("all")} > All</button>
        <button className={`btn ${filter === "completed" ? "btn-success" : "btn-outline-success"}`}
          onClick={() => setFilter("completed")}> Completed </button>
        <button className={`btn ${filter === "pending" ? "btn-warning" : "btn-outline-warning"}`} onClick={() => setFilter("pending")} > Pending </button>
      </div>


      <div className="row">
        {filteredTodos.length === 0 ? (
          <p className="text-center text-muted">No notes available.</p>
        ) : (
          filteredTodos.map((todo) => (
            <div className="col-md-4 mb-3" key={todo.id}>
              <div className={`card shadow-sm border-0 h-100 ${todo.completed ? "bg-light" : ""}`}>
                <div className="card-body">
                  <h5 className={`card-title ${todo.completed ? "text-decoration-line-through text-muted" : "text-primary"}`}>
                    {todo.title}
                  </h5>
                  <p className={`card-text ${todo.completed ? "text-decoration-line-through text-muted" : "text-muted"}`}>
                    {todo.description}
                  </p>
                  <div className="d-flex justify-content-end gap-2">
                    <button
                      className={`btn btn-sm ${todo.completed ? "btn-secondary" : "btn-success"}`}
                      onClick={() => toggleComplete(todo.id)}
                    >
                      {todo.completed ? "Undo" : "Complete"}
                    </button>
                    <button className="btn btn-warning btn-sm" onClick={() => handleEdit(todo.id)}> Edit </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(todo.id)}> Delete </button>
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
