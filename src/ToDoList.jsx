import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import back from './assets/back.png';

function ToDoList() {
  const { id } = useParams(); 
  const listId = Number(id);
  console.log(listId)
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingValue, setEditingValue] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate()

  const loadListFromStorage = () => {
    const storedLists = JSON.parse(localStorage.getItem("todoLists")) || [];
    const targetList = storedLists.find((list) => list.id === Number(listId));
    return targetList ? targetList.tasks : [];
  };

  const getCurrentList = () => {
    const storedLists = JSON.parse(localStorage.getItem("todoLists")) || [];
    return storedLists.find((list) => list.id === Number(listId));
  };

  const saveListToStorage = (updatedTasks) => {
    console.log(updatedTasks) 
    const storedLists = JSON.parse(localStorage.getItem("todoLists")) || [];
    console.log(storedLists)
    const updatedLists = storedLists.map((list) =>
      list.id === Number(listId) ? { ...list, tasks: updatedTasks } : list
    );
    console.log(listId)
    localStorage.setItem("todoLists", JSON.stringify(updatedLists));
  };

  useEffect(() => {
    setTodos( loadListFromStorage());
  }, [listId]);



  useEffect(() => {
    const handleClickOutside = (e) => {
      if (editingIndex !== null && inputRef.current && !inputRef.current.contains(e.target)) {
        saveEdit();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [editingIndex, editingValue]);



  const addTodo = () => {
    if (inputValue.trim() === "") return;
    setTodos([...todos, { text: inputValue, done: false }]);
    setInputValue("");
  };



  const toggleDone = (index) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, done: !todo.done } : todo
      )
    );
  };


  
  useEffect(() => {
    saveListToStorage(todos);
  }, [todos]);

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditingValue(todos[index].text);
  };

  const saveEdit = () => {
    if (editingValue.trim() === "") {
      setTodos(todos.filter((_, i) => i !== editingIndex));
    } else {
      const updatedTodos = [...todos];
      updatedTodos[editingIndex].text = editingValue;
      setTodos(updatedTodos);
    }
    setEditingIndex(null);
    setEditingValue("");
  };

  const handleBackNavigate = () => {
    navigate(`/`)
  }

  return (
    <>  
    <div
     className='flex justify-center items-center min-h-screen '
    >
    <div
    className='absolute top-[150px] w-[60%]'
    >
    <div 
          className="cursor-pointer ps-[6px] mb-5 "
          onClick={() => handleBackNavigate()}> 
            <img
              src={back}
              alt="back"
              className="w-[30px] h-[30px] png-icon object-contain"
            />
    </div>
          

    <div className="mb-2 border-b border-gray-400 text-end">
        {new Date(listId).toLocaleDateString()} - {new Date(listId).toLocaleTimeString()}

    </div>
        
    <div className=" bg-white p-4 shadow-[4px_4px_0px_rgba(0,0,0,0.3)]">
      <ul>
        {todos.map((todo, i) => (
          <li key={i} className="flex items-center mb-2 w-full">
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleDone(i)}
              className="accent-purple mx-3 custom-checkbox"
            />

            {editingIndex === i ? (
              <input
                type="text"
                wrap = 'soft'
                ref={inputRef}
                onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                value={editingValue}
                onChange={(e) => setEditingValue(e.target.value)}
                autoFocus
                className="w-full break-words resize-none focus:outline-none focus:border-b"
                style={{ whiteSpace: "normal", wordBreak: "break-word" }}
              />
            ) : (
              <span
                onClick={() => startEditing(i)}
                style={{
                  textDecoration: todo.done ? "line-through" : "none",
                  color: todo.done? "gray" : "black",
                  cursor: "pointer",
                  width: "90%", 
                  display: "inline-block", 
                  wordWrap: "break-word",   
                  textAlign: "left"
                }}
              >
                {todo.text}
              </span>
            )}
          </li>
        ))}

        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          placeholder="+ add new task..."
          className="w-full break-words resize-none focus:outline-none "
          style={{ whiteSpace: "normal", wordBreak: "break-word" }}

        />
      </ul>
    </div>
    </div>
    </div>
    </>
  );
}

export default ToDoList;
