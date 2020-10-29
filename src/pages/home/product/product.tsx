import React, { Component } from 'react'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './product.less'
import ComPrice from '../../../components/price/price'

class Product extends Component {
    static defaultProps = {
      list: []
    }

	  goDetail(id) {
      Taro.navigateTo({
        url: '/pages/detail/detail?id='+id
      })
	  }

    render() {
        var list = this.props.list
        return(
          <View className="product">
            {list.filter(item => item.type == 1).map((item) => (
              <View className="list" key={item.id} onClick={() => this.goDetail(item.categoryItem.id)}>
                <Image className="list-banner" src={item.categoryItem.listPicUrl}></Image>
                <View className="label">{item.categoryItem.simpleDesc}</View>
                {
                  item.categoryItem.limitedTag &&
                  <View className="tag">{item.categoryItem.limitedTag}</View>
                }
                <View className="list-title">{item.categoryItem.name}</View>
                <ComPrice activityPrice={item.categoryItem.activityPrice} retailPrice={item.categoryItem.retailPrice}/>
                <View className="commet">
                  <Image className="commet-avatar" src={item.categoryItem.comments[0] && item.categoryItem.comments[0].frontUserAvatar || 'https://yanxuan.nosdn.127.net/f0ced6c86ca08ae10b501bd95fb3d11f'}></Image>
                  <View className="commet-text">{item.categoryItem.comments[0] && item.categoryItem.comments[0].content}</View>
                </View>
              </View>
            ))}
          </View>
        )
    }
}

export default Product
