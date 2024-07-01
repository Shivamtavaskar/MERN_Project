import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoBox from './TodoBox'; 
import './TodoBox.css'; 

const TodoItem = () => {
    const [todoItems, setTodoItems] = useState([]); // State to store todo items
    const [todo, setTodo] = useState(""); // State to manage input field value

    useEffect(() => {
        fetchTodos(); // Fetch todos on component mount
    }, []);

    // Function to fetch todos from the server
    const fetchTodos = async () => {
        const response = await axios.get('http://localhost:5000/todos'); // Using axios to make GET request
        setTodoItems(response.data); // Updating todoItems state with response data
    };

    // Handler to update todo state based on input field change
    const handleInputChange = (event) => {
        setTodo(event.target.value); // Updating todo state with input value
    };

    // Function to add a new task
    const addTask = async () => {
        if (todo.trim() !== "") {
            const response = await axios.post('http://localhost:5000/todos', { task: todo }); // POST request to add new task
            setTodoItems([...todoItems, response.data]); // Updating todoItems state with new task data
            setTodo(""); // Clearing input field after adding task
        }
    };

    // Function to delete a task
    const deleteTask = async (id) => {
        await axios.delete(`http://localhost:5000/todos/${id}`); // DELETE request to delete task by ID
        setTodoItems(todoItems.filter(item => item._id !== id)); // Updating todoItems state after deleting task
    };

    // Function to update a task
    const updateTask = async (id, newTask) => {
        const response = await axios.put(`http://localhost:5000/todos/${id}`, { task: newTask }); // PUT request to update task
        setTodoItems(todoItems.map(item => (item._id === id ? response.data : item))); // Updating todoItems state with updated task data
    };

    return (
        <div className='to-do-list'>
            <label>Todo List</label>
            <br />
            <input
                type="text"
                placeholder='Enter the task'
                value={todo}
                onChange={handleInputChange}
            />
            <button
                className='add-btn'
                onClick={addTask}
            >Add</button>
            <ul>
                {/* Mapping over todoItems array to render TodoBox component for each item */}
                {todoItems.map((item, index) => (
                    <TodoBox
                        key={index}
                        item={item}
                        deleteTask={deleteTask}
                        updateTask={updateTask}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TodoItem;
