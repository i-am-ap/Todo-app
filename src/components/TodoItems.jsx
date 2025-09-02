import "./CSS/TodoItems.css";
import tick from "./assets/tick.png";
import not_tick from "./assets/not_tick.png";
import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa";

const TodoItems = ({ no, display, text, setTodos }) => {
  const deleteTodo = (no) => {
    let data = JSON.parse(localStorage.getItem("todos"));
    data = data.filter((todo) => todo.no !== no);
    setTodos(data);
  };

  const toggle = () => {
    let data = JSON.parse(localStorage.getItem("todos"));
    for (let i = 0; i < data.length; i++) {
      if (data[i].no === no) {
        if (data[i].display === "") {
          data[i].display = "line-through";
        } else {
          data[i].display = "";
        }
        break;
      }
    }
    setTodos(data);
  };

  return (
    <div className="todoitems">
      <div
        className={`todoitems-container `}
        onClick={() => {
          toggle(no);
        }}
      >
        {display === "" ? (
          <img src={not_tick} alt="" />
        ) : (
          <img src={tick} alt="" />
        )}
        <div className={`todoitems-text ${display}`}>{text}</div>
      </div>

      <FaTimes
        className="todoitems-cross-icon"
        onClick={() => {
          deleteTodo(no);
        }}
      />
    </div>
  );
};

export default TodoItems;

TodoItems.propTypes = {
  no: PropTypes.number.isRequired,
  display: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  setTodos: PropTypes.func.isRequired,
};
