import React, {Component} from 'react'
import { View, Text, Swiper, SwiperItem, Image} from '@tarojs/components'
import Taro from '@tarojs/taro'
import './banner.less'

class Banner extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: []
        }
    }
    componentDidMount() {
        Taro.request({
            url: 'https://miniapp.you.163.com/xhr/index/index.json', //仅为示例，并非真实的接口地址
            method: 'GET',
            header: {
                'content-type': 'application/json' // 默认值
            },
            success:(res) => {
                this.setState({
                    list: res.data.data.focus
                })
            }
        })
    }

    render(){
        var list = this.state.list
        return (
            <View className="banner">
                <Swiper
                    indicatorDots
                    autoplay
                    indicatorActiveColor='rgb(178, 42, 49)'>
                    {list.map(item => (
                        <SwiperItem>
                            <Image className="img" src={item.img}></Image>
                        </SwiperItem>
                    ))}
                </Swiper>
            </View>
        )
    }
}

export default Banner