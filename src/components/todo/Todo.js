import React, { useState } from "react";
import _ from "lodash";
import { Paginate } from "../../utils/Paginate";
import todo from "./Todo.module.css";

function Todo() {
  const [data, setData] = useState([
    { id: 1, title: "Do todo task for Olujuwon", completed: false },
    { id: 2, title: "Continue React native course", completed: false },
    { id: 3, title: "Play video games", completed: false },
    { id: 4, title: "Watch movies", completed: false },
    { id: 5, title: "Call mummy", completed: false },
    { id: 6, title: "Go for a walk", completed: false },
    { id: 7, title: "Sleep before 11pm", completed: false },
  ]);

  const [pageSize, setPageSize] = useState(4);
  const [pageNumber, setPageNumber] = useState(1);
  const lastIndex = Math.ceil(data.length / pageSize);
  const range = _.range(1, lastIndex + 1);

  const pagination = Paginate(data, pageSize, pageNumber);
  console.log(pagination);

  const handlePageNumber = (r) => {
    setPageNumber(r);
  };

  return (
    <div className={todo.container}>
      <header className={todo.header}>todo list</header>
      <table className={todo.table}>
        <thead>
          <tr>
            <th>S/N</th>
            <th>Completed</th>
            <th>Title</th>
            <th></th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {data.map((d, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <input type="checkbox" />
              </td>
              <td>{d.title}</td>
              <td>
                <button className={`${todo.btn} ${todo.success}`}>Edit</button>
              </td>
              <td>
                <button className={`${todo.btn} ${todo.danger}`}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={todo.pagination}>
        {range.map((r) => (
          <div key={r} onClick={() => handlePageNumber(r)}>
            {r}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Todo;
