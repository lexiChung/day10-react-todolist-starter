import axios from "axios";


const instance = axios.create({
    baseURL : 'http://localhost:8080',
});

instance.interceptors.request.use(
    (config) => {
        console.log("request success",config)
        config.metadata ={
            startTime: new Date()
        }
        return config;
    },
    (error) => {
        console.log("request error",error)
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        response.config.metadata.endTime = new Date();
        response.duration = response.config.metadata.endTime - response.config.metadata.startTime;
        console.log(`Response time: ${response.duration} ms`);
        console.log("response success",response)
        // 提取后端返回的 result 字段
        if (response.data && response.data.result !== undefined) {
            response.data = response.data.result;
        }

        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const getTodos = async () => {
    return await instance.get('/todo/list');
}

export const addTodo = async (todo) => {
    return await instance.post('/todo', todo);
}

export const deleteTodo = async (id) => {
    return await instance.delete(`/todo/${id}`);
}

export const updateTodo = async (id, todo) => {
    return await instance.put(`/todo/${id}`, todo);
}

export const getTodoById = async (id) => {
    return await instance.get(`/todo/${id}`);
}