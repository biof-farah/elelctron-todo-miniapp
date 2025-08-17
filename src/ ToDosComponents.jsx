import React from "react";
import trash from './assets/trash.png';


function ToDosComponents({ myLists, handleListClick, deleteList }) {
    return (
        <div
        className="grid gap-4 grid-cols-1 sm:grid-cols-3 lg:grid-cols-5"
        >
      {myLists.map((list) => (
        <div key={list.id} className="mb-5 mx-3 p-2 border border-gray-400  h-[170px] w-[170px] cursor-pointer bg-white"
        onClick={() => handleListClick(list.id)}
        >
          <div
            className="text-xs text-right me-0 border-b border-purple-light mb-5 pb-1"
            
          >
            {new Date(list.id).toLocaleDateString()} - {new Date(list.id).toLocaleTimeString()}
          </div>
          <div className="flex flex-col h-full justify-between">
          <ul
          className="text-left ms-2"
          >

            {list.tasks.slice(0, 2).map((task, idx) => (
              <li key={idx}>
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleDone(idx)}
                  className="accent-purple mx-3 custom-checkbox"
                />
                <span
                  style={{
                    textDecoration: task.done ? "line-through" : "none",
                    color: task.done? "gray" : "black",
                    width: "50%",
                    display: "inline-block", 
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    textAlign: "left"
                  }}
                >
                  {task.text}
                </span>
              </li>
            ))}
            {list.tasks.length > 3 && 
              <li key="more" className="text-gray-500 ms-4">
                     . . . . . . . .
              </li>
            }
          </ul>

          <span
          onClick={(e) => {
            e.stopPropagation(); 
            deleteList(list.id);
          }
          }
          className="ms-[135px] mb-[30px] cursor-pointer "
          > 
            <img
              src={trash}
              alt="delete"
              className="w-[37px] h-[34px] cursor-pointer object-cover png-icon"
            />
           </span>
          </div>
        </div>
      ))}
      </div>

    ) 
}

export default ToDosComponents;