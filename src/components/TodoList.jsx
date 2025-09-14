import {TodoContext} from "../contexts/TodoContext";
import {useContext, useState} from "react";
import "./TodoList.css"

const TodoList = () => {
    const {state, dispatch} = useContext(TodoContext);

    function toggleDone(id) {
        const action = {type: 'DONE', id: id};
        dispatch(action)
    }

    function deleteTodo(id) {
        dispatch({type: 'DELETE', id});
    }

    return <div className={'todo-group'}>
        <div>
            <div>This is the TodoList Component.</div>
            {
                state.map(({id, text, done}) => {
                    return <div className={`todo-item ${done ? 'done' : ''}`} key={id}>
                        <span onClick={() => toggleDone(id)} style={{cursor: 'pointer'}}>{text}</span>
                        <button className="delete-btn" onClick={() => deleteTodo(id)}>X</button>
                    </div>
                })
            }
        </div>
    </div>
}

export default TodoList