import Taro from '@tarojs/taro'
const baseUrl = 'https://miniapp.you.163.com'

// function request(options) {
//     const { url, data } = options
//     Taro.request({
//         url: baseUrl+options.url, //仅为示例，并非真实的接口地址
//         method: 'GET',
//         data: options.data,
//         header: {
//             'content-type': 'application/json' // 默认值
//         },
//         success:(res) => {
//             console.log(res.data)
//             return res
//         }
//     })
// }

// export default request
export function request(url,data) {
    Taro.request({
        url: baseUrl+url, //仅为示例，并非真实的接口地址
        method: 'GET',
        data: data,
        header: {
            'content-type': 'application/json' // 默认值
        },
        success:(res) => {
            console.log(res.data)
            return res
        }
    })
}
