import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";

const TodoList = () => {
  // need state to keep track of todos
  const [todos, setTodos] = useState([]);
  const [isChecked, setIsChecked] = useState(false);


  // need state to keep track of the value in the input
  const [inputValue, setInputValue] = useState("");


  //   Load to-do items from local storage when the component mounts
  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("toDoItems")) || [];
    console.log(savedItems)
    setTodos(savedItems);
  }, []);

  // Save to-do items to local storage whenever 'todos' state changes
  useEffect(() => {
    if(todos.length > 0 ){
      localStorage.setItem("toDoItems", JSON.stringify(todos));
    }
  }, [todos]);

  const addItem = (e) => {
    e.preventDefault();

    if (inputValue.trim() !== "") {

      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: inputValue.trim(),
          completed : isChecked

        }
      ]);
    }

    // clear out the input box
    setInputValue("");
  }


  const handleEdit = (id, editedText , completed) => {
    const updatedTodos = todos.map( (todo) =>
    todo.id === id ? { ...todo, text: editedText , completed : completed } : todo );
    setTodos(updatedTodos);
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    localStorage.setItem("toDoItems", JSON.stringify(updatedTodos));

    setTodos(updatedTodos);
  };

  return (
    <div className="container">
      {/* create a form element and pass the handleFormSubmit function 
      to the form using the onSubmit prop */}

      <form onSubmit={addItem}>
        {/* create an input element - make sure to add the value prop 
        with the state value passed in and the onChange prop to update
        the state every time something is typed in the input */}

        <input
          type="text"
          placeholder="Enter item to do..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="button" className="btn btn-secondary" onClick={addItem}>
          Add
        </button>
      </form>

      {/* create a ul to hold all of the list items */}

      <ul className="todo-list">
        {/* map over the todos array which creates a new li element for every todo
        (make sure to add the "key" prop using the unique todo.id value to the li element)
        remember this is an array of objects - so we need to access the property 
        "text" to get the value we want to display */}

        {todos.map((todo) => (
          //   <li key={index}>{todo}</li>
          <TodoItem
            key={todo.id}
            item={todo}
            onEdit={(editedText , completed) => handleEdit(todo.id, editedText , completed)}
            onDelete={() => handleDelete(todo.id)} 
            isChecked={isChecked}
            setIsChecked={setIsChecked}
            />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
