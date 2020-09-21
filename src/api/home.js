import request from './utils/request.js'
export default {
    banner(data) {
        return request('/xhr/rcmd/index.json', data)
    },
}