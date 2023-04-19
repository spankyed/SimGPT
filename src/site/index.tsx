import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import { RecoilRoot } from 'recoil'
// import { ReduceStress } from "react-reduce-stress";
import Home from "./home/home";
import Simulator, { action as newUser, loader as userLoader} from "./simulator/simulator";
import './index.css'

const router = [
  {
    path: '/',
    element: <Home/>,
  },
  {
    path: 'simulator',
    element: <Simulator/>,
    loader: userLoader,
    action: newUser,
  },
];

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={createBrowserRouter(router)} />
  </React.StrictMode>
)
