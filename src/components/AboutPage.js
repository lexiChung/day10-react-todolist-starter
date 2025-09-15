import {Card, Typography} from "antd";

const {Title, Paragraph} = Typography;

export function AboutPage() {
    return (
        <div style={{maxWidth: 600, margin: '0 auto', padding: 24}}>
            <Card>
                <Title level={2} style={{textAlign: 'center', color: '#1890ff'}}>
                    📝 关于 TodoList
                </Title>
                <Paragraph style={{fontSize: 16, lineHeight: 1.6}}>
                    这是一个基于 React 和 Ant Design 构建的待办事项管理应用。
                    您可以添加、编辑、完成和删除待办事项，所有数据都会自动保存。
                </Paragraph>
                <Paragraph style={{fontSize: 16, lineHeight: 1.6}}>
                    <strong>主要功能：</strong>
                    <ul>
                        <li>添加新的待办事项</li>
                        <li>编辑现有的待办事项</li>
                        <li>标记待办事项为已完成</li>
                        <li>删除不需要的待办事项</li>
                        <li>查看待办事项详情</li>
                    </ul>
                </Paragraph>
            </Card>
        </div>
    );
}