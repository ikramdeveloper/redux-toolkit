import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from "../api/api.slice";

const TodosList = () => {
  const [newTodo, setNewTodo] = useState("");
  const [userId, setUserId] = useState("");

  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTodosQuery();
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const userIds = [...new Set(todos?.map((todo) => todo.userId))];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo && userId) {
      addTodo({ userId, title: newTodo, completed: false });
      setNewTodo("");
      setUserId("");
    }
  };

  const newItemSection = (
    <form onSubmit={handleSubmit}>
      <label htmlFor="newTodo">Enter a new todo item:</label>
      <div className="new-todo">
        <input
          type="text"
          id="newTodo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new todo..."
        />
        <select
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        >
          <option value="" disabled></option>
          {userIds
            ?.sort((a, b) => a - b)
            .map((id, index) => (
              <option key={id + index} value={id}>
                {id}
              </option>
            ))}
        </select>
      </div>
      <button type="submit" className="submit">
        <FontAwesomeIcon icon={faUpload} />
      </button>
    </form>
  );

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = todos.map((todo) => (
      <article key={todo.id}>
        <div className="todo">
          <input
            type="checkbox"
            id={todo.id}
            checked={todo.completed}
            onChange={() => updateTodo({ ...todo, completed: !todo.completed })}
          />
          <label htmlFor={todo.id}>{todo.title}</label>
        </div>
        <button className="trash" onClick={() => deleteTodo({ id: todo.id })}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </article>
    ));
  } else if (isError) {
    content = <p>Something is fishy... {error}</p>;
  }

  return (
    <main>
      <h1>Todo List</h1>
      {newItemSection}
      {content}
    </main>
  );
};

export default TodosList;
