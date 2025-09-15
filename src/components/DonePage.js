import {TodoContext} from "../contexts/TodoContext";
import {useContext, useEffect} from "react";
import {deleteTodo, getTodos} from "../apis/todos";
import {useNavigate} from "react-router";

export function DonePage() {
    const {state, dispatch} = useContext(TodoContext);
    const navigate = useNavigate();

    useEffect(() => {
        getTodos().then((response) => {
            dispatch({type: 'LOAD_TODOS', todos: response.data})
        })
    }, [dispatch]);

    const doneTodos = state.filter(todo => todo.done);
    const handleDelete = async (id) => {
        await deleteTodo(id);
        dispatch({type: 'DELETE', id});
    }

    return (
        <div className={'todo-group'}>
            <h1>已完成的待办事项</h1>
            {doneTodos.length === 0 && (
                <div className="empty-tip">暂无已完成的待办事项</div>
            )}
            {
                doneTodos.map(({id, text, done}) => {
                    return <div className={`todo-item ${done ? 'done' : ''}`} key={id}>
                        <span>{text}</span>
                        <div>
                            <button className="delete-btn" onClick={() => handleDelete(id)}>delete</button>
                        </div>
                    </div>
                })
            }
        </div>
    );
}