import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './component/Register';
import Login from './component/Login';
import TodoTask from './component/TodoTask';


const router = createBrowserRouter([
  {path:"/register",element:<Register/>},
  {path:"/login", element:<Login/>},
  {path:"/task", element:<TodoTask/>},
])

const App = () => {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App;