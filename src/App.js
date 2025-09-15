import {useReducer} from "react";
import './App.css';
import TodoList from "./components/TodoList";
import {initialState, todoReducer} from "./reducers/todoReducer";
import {TodoContext} from "./contexts/TodoContext";
import {Outlet, RouterProvider, createBrowserRouter, NavLink, useParams} from "react-router";

function DefaultLayout() {
    return <>
        <header>
            <nav>
                <ul>
                    <li><NavLink to={'/'}>Home</NavLink></li>
                    <li><NavLink to={'/todos'}>TodoList</NavLink></li>
                    <li><NavLink to={'todos/:key'}>ToDoDetail</NavLink></li>
                    <li><NavLink to={'/about'}>About</NavLink></li>
                </ul>
            </nav>
        </header>
        <main>
            <Outlet></Outlet>
        </main>
        <footer>footer copyright</footer>
    </>
}

function TodoDetail() {
    const {key} = useParams();
    return <h1>this is {key} detail</h1>;
}

const routes = [
    {
        path: '/',
        element: <DefaultLayout/>,
        children: [
            {
                path: '',
                element: <h1>Home Page</h1>
            },
            {
                path: 'about',
                element: <h1>about page</h1>,
            },
            {
                path: 'todos',
                element: <TodoList/>,
            },
            {
                path: 'todos/:key',
                element: <TodoDetail/>
            }
        ]
    }
]

const router = createBrowserRouter(routes);

function App() {
    const [state, dispatch] = useReducer(todoReducer, initialState);

    return (
        <div className="App">
            <TodoContext.Provider value={{state, dispatch}}>
              {/*<TodoList/>*/}
                <RouterProvider router={router}></RouterProvider>
            </TodoContext.Provider>

        </div>
    );
}

export default App;
