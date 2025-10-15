import axios from 'axios'

// 后端 API 的基础地址
const baseUrl = '/api/notes'

// 获取所有笔记
// axios.get 返回一个 Promise<AxiosResponse>
// 我们在 then 里直接返回 response.data，这样最终返回 Promise<Note[]>
const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

// 创建新笔记
// 第二个参数 newObject 就是要传给后端的请求体
// 最终返回 Promise<Note>，内容就是新建好的笔记对象
const create = (newObject) => {
    return axios.post(baseUrl, newObject).then(response => response.data)
}

// 更新已有笔记
// url 拼接了 id，指向唯一一条笔记
// newObject 是更新后的笔记对象
// 返回 Promise<Note>，即更新后的那条笔记
const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data)
}

// 导出成一个对象，供外部使用
export default {
    getAll,
    create,
    update
}
