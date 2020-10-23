import React, { useState, useEffect } from "react";
import _ from "lodash";
import { AiFillDelete } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
import { db } from "../firebase/Firebase";
import { Paginate } from "../../utils/Paginate";
import Icon from "../icon/Icon";
import todo from "./Todo.module.css";

function Todo() {
  const [data, setData] = useState([]);
  const [pageSize] = useState(4);
  const [pageNumber, setPageNumber] = useState(1);
  const [addTodo, setAddTodo] = useState("");
  const [editTodo, setEditTodo] = useState("");
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("asc");

  useEffect(() => {
    getTodo();
  }, []);

  const getTodo = async () => {
    const todos = await db.collection("todos").get();
    const todosData = todos.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    setData(todosData);
  };

  const handlePageNumber = (r) => {
    setPageNumber(r);
  };

  const checkboxChange = async (d) => {
    const ref = db.doc(`todos/${d.id}`);
    const refGet = await ref.get();
    const refData = refGet.data().completed;

    await ref.update({
      completed: !refData,
    });

    getTodo();
  };

  const deleteTodo = async (d) => {
    const newTodos = data.filter((dat) => dat.id !== d.id);
    setData(newTodos);
    await db.doc(`todos/${d.id}`).delete();
  };

  const handleAdd = async () => {
    if (!addTodo) return alert("Please describe todo");
    const obj = { title: addTodo, completed: false };
    await db.collection("todos").add(obj);

    getTodo();

    setAddTodo("");
  };

  const handleEdit = (d) => {
    const newData = [...data];

    const index = newData.indexOf(d);
    newData[index].edit = !newData[index].edit;
    setData(newData);
    setEditTodo(newData[index].title);
  };

  const handleEditChange = (e) => {
    setEditTodo(e.target.value);
  };

  const saveTodo = async (d) => {
    if (!editTodo) return alert("Please enter description");
    await db.doc(`todos/${d.id}`).update({
      title: editTodo.trim(),
    });

    handleEdit(d);
    getTodo();
  };

  const paginationStyle = (r) => {
    if (pageNumber === r) {
      return {
        background: "#cd5c5c",
        border: "1px solid #cd5c5c",
        color: "#fff",
      };
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPageNumber(1);
  };

  const sortedBy = () => {
    if (sortType === "asc") return setSortType("desc");
    setSortType("asc");
  };

  console.log(sortType);

  const searchData =
    search.length > 1
      ? data.filter(
          (d) =>
            d.title.toLowerCase().startsWith(search) ||
            d.title.toLowerCase().endsWith(search) ||
            d.title.toLowerCase().includes(search)
        )
      : data;

  const sort = _.orderBy(searchData, ["title"], [sortType]);

  const lastIndex = Math.ceil(sort.length / pageSize);
  const range = lastIndex === 1 ? [] : _.range(1, lastIndex + 1);
  const pagination = Paginate(sort, pageSize, pageNumber);

  return (
    <div className={todo.container}>
      <header className={todo.header}>todo list</header>

      <div className={todo.addSearch}>
        <div className={todo.addTodo}>
          <input
            type="text"
            value={addTodo}
            placeholder="Add todo"
            onChange={(e) => setAddTodo(e.target.value)}
          />

          <button className={`${todo.btn} ${todo.add}`} onClick={handleAdd}>
            Add Todo
          </button>
        </div>

        <div className={todo.search}>
          <input
            type="text"
            value={search}
            placeholder="Search todo..."
            onChange={handleSearch}
          />
        </div>
      </div>

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
                <input type="checkbox" onChange={() => checkboxChange(d)} />
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

      <div className={todo.pagination}>
        {range.map((r) => (
          <div
            key={r}
            onClick={() => handlePageNumber(r)}
            style={paginationStyle(r)}
          >
            {r}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Todo;
