import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './group.less'

export default class Group extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  goDetail(items) {
    Taro.navigateTo({
      url: '/pages/cateSub/cateSub?id='+items.id+'&categoryId='+items.superCategoryId
    })
  }

  render() {
    const { list } = this.props
    return (
      <View className="group">
        {list && list.map(item => (
          <View className="group-list">
            <View className="group-list-title">{item.name}</View>
            <View className="sub">
              {item.categoryList.map(items => (
                <View className="sub-list" onClick={() => this.goDetail(items)}>
                  <Image className="sub-list-img" src={items.bannerUrl}></Image>
                  <View className="sub-list-text">{items.name}</View>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    )
  }
}
