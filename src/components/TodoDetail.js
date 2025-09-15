import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {getTodoById} from "../apis/todos";

export function TodoDetail() {
    const {key} = useParams();
    const [todo, setTodo] = useState(null);

    useEffect(() => {
        getTodoById(key).then(response => {
            setTodo(response.data);
        });
    }, [key]);

    if (!todo) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Todo Detail</h1>
            <p><strong>ID:</strong> {todo.id}</p>
            <p><strong>Text:</strong> {todo.text}</p>
            <p><strong>Status:</strong> {todo.done ? '已完成' : '未完成'}</p>
        </div>
    );
}