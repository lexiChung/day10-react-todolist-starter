import {TodoContext} from "../contexts/TodoContext";
import {useContext, useEffect} from "react";
import {deleteTodo, getTodos} from "../apis/todos";
import {Button, Card, Space, Typography, Empty, Tag} from "antd";
import {DeleteOutlined} from "@ant-design/icons";

const {Title, Text} = Typography;

export function DonePage() {
    const {state, dispatch} = useContext(TodoContext);

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
        <div style={{maxWidth: 800, margin: '0 auto', padding: 24}}>
            <Card>
                <Title level={2} style={{textAlign: 'center', marginBottom: 24, color: '#52c41a'}}>
                    ✅ 已完成的待办事项
                </Title>

                {doneTodos.length === 0 ? (
                    <Empty
                        description="暂无已完成的待办事项"
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                ) : (
                    <Space direction="vertical" style={{width: '100%'}} size="middle">
                        {doneTodos.map(({id, text}) => (
                            <Card
                                key={id}
                                size="small"
                                style={{
                                    borderRadius: 8,
                                    border: '1px solid #f0f0f0',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                    backgroundColor: '#f6ffed'
                                }}
                                bodyStyle={{padding: 16}}
                            >
                                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <Text style={{flex: 1, fontSize: 16, color: '#262626'}}>{text}</Text>
                                    <Tag color="success" style={{marginLeft: 8}}>已完成</Tag>
                                    <Button
                                        danger
                                        icon={<DeleteOutlined/>}
                                        onClick={() => handleDelete(id)}
                                        size="small"
                                        style={{marginLeft: 16}}
                                    >
                                        删除
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </Space>
                )}
            </Card>
        </div>
    );
}