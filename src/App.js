import {useReducer} from "react";
import './App.css';
import TodoList from "./components/TodoList";
import {initialState, todoReducer} from "./reducers/todoReducer";
import {TodoContext} from "./contexts/TodoContext";
import {createBrowserRouter, RouterProvider} from "react-router";
import {DefaultLayout} from "./layout/DefaultLayout";
import {TodoDetail} from "./components/TodoDetail";
import {ErrorPage} from "./components/ErrorPage";
import {DonePage} from "./components/DonePage";
import {AboutPage} from "./components/AboutPage";

const routes = [
    {
        path: '/',
        element: <DefaultLayout/>,
        errorElement:<ErrorPage></ErrorPage>,
        children: [
            {
                path: '',
                element: <h1>Welcome to Todolist!</h1>
            },
            {
                path: 'about',
                element: <AboutPage/>,
            },
            {
                path: 'todos',
                element: <TodoList/>,
            },
            {
                path: 'todos/:key',
                element: <TodoDetail/>
            },
            {
                path: 'done',
                element: <DonePage/>,
            },
        ]
    }
]

const router = createBrowserRouter(routes);

function App() {
    const [state, dispatch] = useReducer(todoReducer, initialState);

    return (
        <div className="App">
            <TodoContext.Provider value={{state, dispatch}}>
                <RouterProvider router={router}></RouterProvider>
            </TodoContext.Provider>
        </div>
    );
}

export default App;
