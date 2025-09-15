import {useParams, useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {getTodoById} from "../apis/todos";
import {Card, Typography, Tag, Button, Spin} from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons";

const {Title, Text} = Typography;

export function TodoDetail() {
    const {key} = useParams();
    const [todo, setTodo] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getTodoById(key)
            .then(response => {
                setTodo(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('获取todo详情失败:', err);
                setLoading(false);
            });
    }, [key]);

    if (loading) {
        return (
            <div style={{textAlign: 'center', padding: 50}}>
                <Spin size="large" />
            </div>
        );
    }

    if (!todo) {
        return (
            <div style={{maxWidth: 600, margin: '0 auto', padding: 24}}>
                <Card>
                    <Title level={3}>待办事项不存在</Title>
                    <Button type="primary" onClick={() => navigate('/todos')}>
                        返回列表
                    </Button>
                </Card>
            </div>
        );
    }

    return (
        <div style={{maxWidth: 600, margin: '0 auto', padding: 24}}>
            <Card>
                <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate('/todos')}
                    style={{marginBottom: 16}}
                >
                    返回列表
                </Button>

                <Title level={2} style={{marginBottom: 24}}>📋 待办事项详情</Title>

                <div style={{marginBottom: 16}}>
                    <Text strong style={{fontSize: 16}}>ID: </Text>
                    <Text style={{fontSize: 16}}>{todo.id}</Text>
                </div>

                <div style={{marginBottom: 16}}>
                    <Text strong style={{fontSize: 16}}>内容: </Text>
                    <Text style={{fontSize: 16}}>{todo.text}</Text>
                </div>

                <div>
                    <Text strong style={{fontSize: 16}}>状态: </Text>
                    <Tag color={todo.done ? 'success' : 'orange'} style={{fontSize: 14}}>
                        {todo.done ? '✅ 已完成' : '⏳ 未完成'}
                    </Tag>
                </div>
            </Card>
        </div>
    );
}