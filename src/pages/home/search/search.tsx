import { View, Image, Input } from '@tarojs/components'
import React, { Component } from 'react'
import icon from '../../../../static/images/search.png'
import './search.less'

class Search extends Component {
    render() {
        return (
            <View className="search">
                <Image className="search-icon" src={icon}></Image>
                <Input className="search-input" placeholder="请输入" placeholder-class="placeholder"></Input>
            </View>
        )
    }
}

export default Search