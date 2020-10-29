import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './cart.less'

export default class CateItem extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  
  goDetail(id) {
    Taro.navigateTo({
      url: '/pages/detail/detail?id='+id
    })
  }

  render() {
    const { list } = this.props
    return(
      <View className="content">
        {list.map(item => (
          <View className="cateitem" onClick={() => this.goDetail(item.id)}>
            <Image className="cateitem-img" src={item.listPicUrl}></Image>
            <View className="cateitem-title">{item.name}</View>
            <View className="price">
              {
                item.activityPrice &&
                <View className="price-detail">￥{item.activityPrice}</View>
              }
              {
                item.retailPrice &&
                <View className="price-detail">￥{item.retailPrice}</View>
              }
            </View>
          </View>
        ))}
      </View>
    )
  }
}
