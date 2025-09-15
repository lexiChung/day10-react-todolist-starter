import {TodoContext} from "../contexts/TodoContext";
import {useContext, useEffect, useState} from "react";
import "./TodoList.css"
import {addTodo, deleteTodo, getTodoById, getTodos, updateTodo} from "../apis/todos";

const TodoList = () => {
    const {state, dispatch} = useContext(TodoContext);
    const [input, setInput] = useState("");
    const [editText, setEditText] = useState("");
    const [editingTodo, setEditingTodo] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        getTodos().then((response) => {
            dispatch({type: 'LOAD_TODOS', todos: response.data})
        })
    }, [dispatch]);

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
    const handleToggleUpdate = async (id) => {
        const response = await getTodoById(id);
        const newTodo = {
            ...response.data,
            done: !response.data.done
        }
        await updateTodo(id, newTodo);
        console.log(newTodo)
        dispatch({type: 'DONE', id, todo: newTodo});
    }

    const handleUpdate = async (id) => {
        const response = await getTodoById(id);
        setEditingTodo(response.data);
        setEditText(response.data.text);
        setShowModal(true);
    }

    const handleSave = async (id) => {
        const newTodo= {
            ...editingTodo,
            text : editText.trim()
        }
        await updateTodo(newTodo.id, newTodo);
        const response = await getTodos();
        dispatch({type: 'LOAD_TODOS', todos: response.data});
        setShowModal(false);
        setEditingTodo(null);
        setEditText("");
    }
    const handleCancel = () => {
        setShowModal(false);
        setEditingTodo(null);
        setEditText("");
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
                        <span onClick={() => handleToggleUpdate(id)} style={{cursor: 'pointer'}}>{text}</span>
                        <div>
                            <button className="delete-btn" onClick={() => handleDelete(id)}>delete</button>
                        </div>
                        <div>
                            <button className="update-btn" onClick={() => handleUpdate(id)}>update</button>
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
        {showModal && (
            <div className="modal-overlay">
                <div className="modal">
                    <h3>编辑待办事项</h3>
                    <input
                        type="text"
                        value={editText}
                        onChange={e => setEditText(e.target.value)}
                        className="edit-input"
                    />
                    <div className="modal-buttons">
                        <button onClick={handleSave} className="save-btn">保存</button>
                        <button onClick={handleCancel} className="cancel-btn">取消</button>
                    </div>
                </div>
            </div>
        )}
</div>
}

export default TodoList