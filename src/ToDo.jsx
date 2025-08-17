import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ToDosComponents from "./ ToDosComponents";
import upa from './assets/upa.png';
import doa from './assets/doa.png';
import InstructionsModal from "./InstructionsModal";

export default function ToDo() {
  const [ToDos, setToDos] = useState([]);
  const navigate = useNavigate();

  // Load from localStorage on first render
  useEffect(() => {
    const storedLists = JSON.parse(localStorage.getItem("todoLists")) || [];
    setToDos(storedLists);
  }, []);

  // Save to localStorage whenever ToDos changes
  useEffect(() => {
    localStorage.setItem("todoLists", JSON.stringify(ToDos));
  }, [ToDos]);

  const handleListClick = (listId) => {
    navigate(`/${listId}`);
  };

  const deleteList = (listId) => {
    const updatedLists = ToDos.filter((list) => list.id !== listId)
    setToDos(updatedLists);
  }

  const addToDo = () => {
    const newId = Date.now();
    const newList = {
      id: newId,
      tasks: [],
    };
    setToDos((prev) => [...prev, newList]);
    /*  handleListClick(newId) */;
  };

  const activeLists = ToDos.slice().reverse().filter( list => list.tasks.some(task => !task.done) || list.tasks.length == 0);
  const completedLists = ToDos.slice().reverse().filter( list => list.tasks.every(task => task.done) && list.tasks.length != 0);

  const [showCompleted, setShowCompleted] = useState(false);

  return (
    <>
    
    <div
    className="fixed top-[80px] right-5 z-50"
    >
      <InstructionsModal/>
    </div>
    
    <div className="grid">
      <span
        onClick={addToDo}
        className=" text-gray-500 px-4 py-2 mb-4 cursor-pointer m-5 justify-self-start hover:text-black mt-[100px]"
      >
        + add new list
      </span>
      <ToDosComponents
        myLists={activeLists}
        handleListClick={handleListClick}
        deleteList={deleteList}
      />
      </div>
      <div
        className="grid "
      >
      {completedLists.length > 0 && (
        <>
          <span
            className="text-gray-500 px-4 py-2 mb-2 cursor-pointer m-5 flex items-start gap-2 hover:text-black"
            onClick={() => setShowCompleted((prev) => !prev)}
                      >
            Completed Lists
            <img
              src={showCompleted ? upa : doa}
              alt="toggle arrow"
              className="w-4 h-3 opacity-70 mt-1"
            />
          </span>

          {showCompleted && (
            <ToDosComponents
              myLists={completedLists}
              handleListClick={handleListClick}
              deleteList={deleteList}
            />
          )}
          
        </>
      )}
      </div>
    </>
  );
}
