import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
import Icon from "../icon/Icon";
import todo from "./Todo.module.css";

function TodoTable({
  sortedBy,
  sortType,
  pagination,
  checkboxChange,
  editTodo,
  handleEditChange,
  saveTodo,
  handleEdit,
  deleteTodo,
}) {
  return (
    <table className={todo.table}>
      <thead>
        <tr>
          <th>Completed</th>
          <th onClick={sortedBy}>
            Title{" "}
            <Icon
              label={<IoIosArrowDown />}
              myClass={sortType === "desc" ? todo.up : todo.down}
            />
          </th>
          <th></th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {pagination.map((d) => (
          <tr key={d.id}>
            <td>
              <input
                type="checkbox"
                onChange={() => checkboxChange(d)}
                defaultChecked={d.completed ? true : false}
              />
            </td>
            <td style={{ textDecoration: d.completed && "line-through" }}>
              {d.edit ? (
                <div className={todo.editTodo}>
                  <input
                    type="text"
                    value={editTodo}
                    onChange={handleEditChange}
                  />
                </div>
              ) : (
                d.title
              )}
            </td>
            <td>
              {d.edit ? (
                <div className={todo.editBtn}>
                  <button
                    className={`${todo.btn} ${todo.add}`}
                    onClick={() => saveTodo(d)}
                  >
                    Save
                  </button>
                  <button
                    className={`${todo.btn} ${todo.danger}`}
                    onClick={() => handleEdit(d)}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <Icon
                  label={<MdModeEdit />}
                  myClass={`${todo.icon} ${todo.iconAdd}`}
                  handleClick={() => handleEdit(d)}
                />
              )}
            </td>
            <td>
              <Icon
                label={<AiFillDelete />}
                myClass={`${todo.icon} ${todo.iconDanger}`}
                handleClick={() => deleteTodo(d)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TodoTable;
