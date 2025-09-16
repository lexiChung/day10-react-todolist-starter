import {TodoContext} from "../contexts/TodoContext";
import {useContext, useEffect, useState} from "react";
import {addTodo, deleteTodo, getTodoById, getTodos, updateTodo} from "../apis/todos";
import {useNavigate} from "react-router";
import {Button, Card, Input, Modal, Space, Typography, Empty, Divider, Tag} from "antd";
import {PlusOutlined, EditOutlined, DeleteOutlined, CheckOutlined} from "@ant-design/icons";

const {Title, Text} = Typography;

const TodoList = () => {
    const {state, dispatch} = useContext(TodoContext);
    const [input, setInput] = useState("");
    const [editText, setEditText] = useState("");
    const [editingTodo, setEditingTodo] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const undoneTodos = state.filter(todo => !todo.done);

    console.log(undoneTodos);

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
    const handleUpdate = async (id) => {
        const response = await getTodoById(id);
        setEditingTodo(response.data);
        setEditText(response.data.text);
        setShowModal(true);
    }
    const handleSave = async (id) => {
        const newTodo = {
            ...editingTodo,
            text: editText.trim()
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
    const handleTextClick = (id) => {
        navigate(`/todos/${id}`);
    };
    const handleToggleDone = async (id) => {
        const response = await getTodoById(id);
        const updatedTodo = {...response.data, done: !response.data.done};
        console.log(updatedTodo);
        await updateTodo(id, updatedTodo);
        const todosResponse = await getTodos();
        dispatch({type: 'LOAD_TODOS', todos: todosResponse.data});
    }

    return (
        <div style={{maxWidth: 800, margin: '0 auto', padding: 24}}>
            <Card>
                <Title level={2} style={{textAlign: 'center', marginBottom: 24, color: '#1890ff'}}>
                    📝 待办事项
                </Title>

                {undoneTodos.length === 0 ? (
                    <Empty
                        description="暂无待办事项"
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                ) : (
                    <Space direction="vertical" style={{width: '100%'}} size="middle">
                        {undoneTodos.map(({id, text, done}) => (
                            <Card
                                key={id}
                                size="small"
                                hoverable
                                style={{
                                    borderRadius: 8,
                                    border: '1px solid #f0f0f0',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                }}
                                styles={{ body: { padding: 16 } }}
                            >
                                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <Text
                                        onClick={() => handleTextClick(id)}
                                        style={{
                                            cursor: 'pointer',
                                            flex: 1,
                                            fontSize: 16,
                                            color: '#262626'
                                        }}
                                    >
                                        {text}
                                    </Text>
                                    <Tag color="orange" style={{marginLeft: 8}}>待完成</Tag>
                                    <Space style={{marginLeft: 16}}>
                                        <Button
                                            type="primary"
                                            icon={<CheckOutlined/>}
                                            onClick={() => handleToggleDone(id)}
                                            size="small"
                                        >
                                            完成
                                        </Button>
                                        <Button
                                            icon={<EditOutlined/>}
                                            onClick={() => handleUpdate(id)}
                                            size="small"
                                        >
                                            编辑
                                        </Button>
                                        <Button
                                            danger
                                            icon={<DeleteOutlined/>}
                                            onClick={() => handleDelete(id)}
                                            size="small"
                                        >
                                            删除
                                        </Button>
                                    </Space>
                                </div>
                            </Card>
                        ))}
                    </Space>
                )}

                <Divider/>

                <div style={{display: 'flex', gap: 12}}>
                    <Input
                        placeholder="添加新的待办事项..."
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onPressEnter={handleSubmit}
                        size="large"
                        style={{flex: 1}}
                    />
                    <Button
                        type="primary"
                        icon={<PlusOutlined/>}
                        onClick={handleSubmit}
                        size="large"
                        disabled={!input.trim()}
                    >
                        添加
                    </Button>
                </div>
            </Card>

            <Modal
                title="编辑待办事项"
                open={showModal}
                onOk={handleSave}
                onCancel={handleCancel}
                okText="保存"
                cancelText="取消"
                centered
            >
                <Input
                    value={editText}
                    onChange={e => setEditText(e.target.value)}
                    placeholder="请输入待办事项内容"
                    size="large"
                />
            </Modal>
        </div>
    );
}

export default TodoList;