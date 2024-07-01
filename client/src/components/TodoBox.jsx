import React from 'react';

const TodoBox = ({ item, deleteTask, updateTask }) => {
    const handleUpdateClick = () => {
        const newTask = prompt('Update task:', item.task);
        if (newTask) updateTask(item._id, newTask);
    };

    return (
        <li>
            <span style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
                {item.task}
            </span>
            <button onClick={() => deleteTask(item._id)}>Delete</button>
            <button onClick={handleUpdateClick}>Update</button>
        </li>
    );
};

export default TodoBox;
