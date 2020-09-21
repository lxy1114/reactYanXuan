import React, { Component } from 'react'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './product.less'

class Product extends Component {
    static defaultProps = {
      list: []
    }

    render() {
        var list = this.props.list
        return(
            <View className="product">
              {list.filter(item => item.type == 1).map((item) => (
                <View className="list" key={item.id}>
                  <Image className="list-banner" src={item.categoryItem.listPicUrl}></Image>
                  <View className="label">{item.categoryItem.simpleDesc}</View>
                  {
                    item.categoryItem.limitedTag &&
                    <View className="tag">{item.categoryItem.limitedTag}</View>
                  }
                  <View className="list-title">{item.categoryItem.name}</View>
                  <View className="price">
                    {
                      item.categoryItem.activityPrice &&
                      <View className="price-detail">￥{item.categoryItem.activityPrice}</View>
                    }
                    {
                      item.categoryItem.retailPrice &&
                      <View className="price-detail">￥{item.categoryItem.retailPrice}</View>
                    }
                  </View>
                  <View className="commet">
                    <Image className="commet-avatar" src={item.categoryItem.comments[0].frontUserAvatar || 'https://yanxuan.nosdn.127.net/f0ced6c86ca08ae10b501bd95fb3d11f'}></Image>
                    <View className="commet-text">{item.categoryItem.comments[0].content}</View>
                  </View>
                </View>
              ))}
            </View>
        )
    }
}

export default Product
