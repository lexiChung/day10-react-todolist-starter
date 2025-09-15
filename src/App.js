import {useReducer} from "react";
import './App.css';
import TodoList from "./components/TodoList";
import {initialState, todoReducer} from "./reducers/todoReducer";
import {TodoContext} from "./contexts/TodoContext";
import {createBrowserRouter, RouterProvider, useParams} from "react-router";
import {DefaultLayout} from "./layout/DefaultLayout";

function TodoDetail() {
    const {key} = useParams();
    return <h1>this is {key} detail</h1>;
}

function ErrorPage() {
    return <h1>Error</h1>;
}

const routes = [
    {
        path: '/',
        element: <DefaultLayout/>,
        errorElement:<ErrorPage></ErrorPage>,
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
