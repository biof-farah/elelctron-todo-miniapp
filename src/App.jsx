import ToDoList from "./ToDoList"
import ToDo from "./ToDo"
import Taskbar from "./TaskBar"
import "./App.css"
import { Route, Routes, BrowserRouter } from "react-router-dom"
import { HashRouter } from "react-router-dom"


function App() {

  return (
  
    <div className="main-frame m-auto p-5 ">
    <Taskbar/>
    <HashRouter><Routes>
    <Route path="/" element={<ToDo/>}/>
    <Route path="/:id" element={<ToDoList/>}/>
      </Routes></HashRouter>
    
    </div>
  )
}

export default App
