import {TodoContext} from "../contexts/TodoContext";
import {useContext, useEffect, useState} from "react";
import "./TodoList.css"
import {addTodo, deleteTodo, getTodoById, getTodos, updateTodo} from "../apis/todos";

const TodoList = () => {
    const {state, dispatch} = useContext(TodoContext);
    const [input, setInput] = useState("");

    useEffect(() => {
        getTodos().then((response) => {
            dispatch({type:'LOAD_TODOS',todos : response.data})
        })
    },[dispatch]);

    const handleDelete = async (id) => {
        await deleteTodo(id);
        dispatch({type: 'DELETE', id});
    }
    const handleSubmit = async () => {
        const newTodo = {
            done: false,
            text: input.trim()
        }
        const response = await addTodo(newTodo);
        dispatch({type: 'ADD', todo: response.data});
        setInput("");
    }
    const handleUpdate = async (id) => {
        const response = await getTodoById(id);
        const newTodo = {
            ...response.data,
            done: !response.data.done
        }
        await updateTodo(id, newTodo);
        console.log(newTodo)
        dispatch({type: 'DONE', id, todo: newTodo});
    }

    return <div className={'todo-group'}>
        <div>
            <h1>Todo List</h1>
            {state.length === 0 && (
                <div className="empty-tip">add the things you need to do today...</div>
            )}
            {
                state.map(({id, text, done}) => {
                    return <div className={`todo-item ${done ? 'done' : ''}`} key={id}>
                        <span onClick={() => handleUpdate(id)} style={{cursor: 'pointer'}}>{text}</span>
                        <div>
                            <button className="delete-btn" onClick={() => handleDelete(id)}>X</button>
                        </div>
                    </div>
                })
            }
        </div>
        <div className="add-row">
            <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                className="add-input"
            />
            <button className="add-btn" onClick={handleSubmit}>add</button>
        </div>
    </div>
}

export default TodoList