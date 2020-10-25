import React, { useState, useEffect, useContext } from "react";
import _ from "lodash";
import { db } from "../firebase/Firebase";
import CheckAuth from "../../hoc/CheckAuth";
import Header from "../header/Header";
import Table from "./TodoTable";
import Input from "../../common/Input";
import Div from "../../common/Div";
import Button from "../../common/Button";
import Pagination from "../../common/Pagination";
import { Paginate } from "../../utils/Paginate";
import { userContext } from "../../contexts/UserContext";
import todo from "./Todo.module.css";

function Todo(props) {
  const [data, setData] = useState([]);
  const [pageSize] = useState(4);
  const [pageNumber, setPageNumber] = useState(1);
  const [addTodo, setAddTodo] = useState("");
  const [editTodo, setEditTodo] = useState("");
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("asc");
  const [init, setInit] = useState(false);

  const currentUser = useContext(userContext);

  useEffect(() => {
    if (currentUser && !init) {
      getTodo();
      setInit(true);
    }
  }, []);

  async function getTodo() {
    const todosRef = await db.collection(`users/${currentUser.id}/todos`).get();
    const todos = todosRef.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    setData(todos);
  }

  const handlePageNumber = (r) => {
    setPageNumber(r);
  };

  const checkboxChange = async (d) => {
    const newData = [...data];

    const index = newData.indexOf(d);
    newData[index].completed = !newData[index].completed;

    await db.doc(`users/${currentUser.id}/todos/${d.id}`).update({
      completed: newData[index].completed,
    });

    getTodo();
  };

  const deleteTodo = async (d) => {
    await db.doc(`users/${currentUser.id}/todos/${d.id}`).delete();
    getTodo();
  };

  const handleAdd = async () => {
    if (!addTodo) return alert("Please describe todo");
    const obj = { title: addTodo, completed: false };
    await db.collection(`users/${currentUser.id}/todos`).add(obj);

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
    await db.doc(`users/${currentUser.id}/todos/${d.id}`).update({
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

  const searchData =
    search.length > 1
      ? data.filter(
          (d) =>
            d.title.toLowerCase().startsWith(search.toLocaleLowerCase()) ||
            d.title.toLowerCase().endsWith(search.toLocaleLowerCase()) ||
            d.title.toLowerCase().includes(search.toLocaleLowerCase())
        )
      : data;

  const sort = _.orderBy(searchData, ["title"], [sortType]);

  const lastIndex = Math.ceil(sort.length / pageSize);
  const range = lastIndex === 1 ? [] : _.range(1, lastIndex + 1);
  const pagination = Paginate(sort, pageSize, pageNumber);

  return (
    <CheckAuth {...props}>
      <Div className={todo.container}>
        <Header className={todo.header} label="todo list" />

        <Div className={todo.addSearch}>
          <Div className={todo.addTodo}>
            <Input
              value={addTodo}
              placeholder="Add todo"
              onChange={(e) => setAddTodo(e.target.value)}
            />

            <Button
              className={`${todo.btn} ${todo.add}`}
              label="Add Todo"
              onClick={handleAdd}
            />
          </Div>

          <Div className={todo.search}>
            <Input
              value={search}
              placeholder="Search todo..."
              onChange={handleSearch}
            />
          </Div>
        </Div>

        <Table
          sortedBy={sortedBy}
          sortType={sortType}
          pagination={pagination}
          checkboxChange={checkboxChange}
          editTodo={editTodo}
          handleEditChange={handleEditChange}
          saveTodo={saveTodo}
          handleEdit={handleEdit}
          deleteTodo={deleteTodo}
        />

        <Pagination
          className={todo.pagination}
          range={range}
          handlePageNumber={handlePageNumber}
          paginationStyle={paginationStyle}
        />
      </Div>
    </CheckAuth>
  );
}

export default Todo;
