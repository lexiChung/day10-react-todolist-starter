import {NavLink, Outlet} from "react-router";
import {Layout, Menu} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout";
import {HomeOutlined} from "@ant-design/icons";
const items = [
    {
        label: <NavLink to={'/'}>Home</NavLink>,
        key: 'home',
        icon:<HomeOutlined />
    },
    {
        label: <NavLink to={'/todos'}>TodoList</NavLink>,
        key: 'todolist'
    },
    {
        label: <NavLink to={'/done'}>DonePage</NavLink>,
        key: 'DonePage'
    },
    {
        label: <NavLink to={'/about'}>About</NavLink>,
        key: 'about'
    }
]

export function DefaultLayout() {
    return <Layout>
        <Header>
            <Menu theme="dark" mode="horizontal" items={items}></Menu>
        </Header>
        <Content>
            <Outlet></Outlet>
        </Content>
        <Footer>footer copyright</Footer>
    </Layout>
}