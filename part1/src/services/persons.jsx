import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => axios.get(baseUrl).then(res => res.data)
const create = (person) => axios.post(baseUrl, person).then(res => res.data)
const remove = (id) => axios.delete(`${baseUrl}/${id}`)
// 可选 update，如果你做编辑：
const update = (id, person) => axios.put(`${baseUrl}/${id}`, person).then(res => res.data)

export default { getAll, create, remove, update }
