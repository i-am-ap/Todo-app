import { useState } from "react";
import "./CSS/Todo.css";
import { useRef } from "react";
import { useEffect } from "react";
import TodoItems from "./TodoItems";

let count = 0;
const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [isEdited, setIsEdited] = useState(false);
  const [selectedID, setSelectedID] = useState(null);
  const inputRef = useRef(null);

  const add = () => {
    const inputValue = inputRef.current.value.trim();
    if (inputValue) {
      setTodos([
        ...todos,
        { no: count++, text: inputRef.current.value, display: "" },
      ]);
      inputRef.current.value = "";
      localStorage.setItem("todos_count", count);
    }
  };

  function edit(no) {
    inputRef.current.focus();
    setIsEdited(true);
    inputRef.current.value = todos.filter((item) => item.no === no).at(0).text;
    setSelectedID(no);
  }

  function editTodo() {
    const updatedTodoList = todos.map((todo) => {
      if (todo.no === selectedID) {
        return { ...todo, text: inputRef.current.value };
      }
      return todo;
    });

    setTodos(updatedTodoList);
    setIsEdited(false);
    inputRef.current.value = "";
  }

  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem("todos")));
    count = localStorage.getItem("todos_count");
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      console.log(todos);
      localStorage.setItem("todos", JSON.stringify(todos));
    }, 100);
  }, [todos]);

  return (
    <div className="todo">
      <div className="todo-header">Taskly</div>
      <form className="todo-add" onSubmit={(e) => e.preventDefault()}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Add new task"
          className="todo-input"
        />
        <div
          onClick={(e) => {
            isEdited ? editTodo(e) : add(e);
          }}
          className="todo-add-btn"
        >
          {isEdited ? "Save" : "Add"}
        </div>
      </form>
      <div className="todo-list">
        {todos.length > 0 ? (
          todos.map((item, index) => {
            return (
              <TodoItems
                key={index}
                setTodos={setTodos}
                no={item.no}
                display={item.display}
                text={item.text}
                edit={edit}
              />
            );
          })
        ) : (
          <h2 className="h2">Please, add a todo :)</h2>
        )}
      </div>
    </div>
  );
};

export default Todo;
