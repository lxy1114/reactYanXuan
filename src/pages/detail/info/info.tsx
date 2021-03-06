import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import './info.less'

export default class DetailInfo extends Component {
  static defaultProps = {
    info: {}
  }

  render() {
    const { info } = this.props
    return(
      <View className="content">
        <View className="info">
          <View className="title">
            <View className="title-name">{info.name}</View>
            <View className="title-text">{info.simpleDesc}</View>
          </View>
          <View className="tag">
            {
              info.itemStar && <View className="tag-num">{parseFloat(info.itemStar.goodCmtRate)+'%'}</View>
            }
            <View className="tag-title">好评率></View>
          </View>
        </View>
        <View className="price">
          {
            info.activityPrice && <View className="price-num">{'￥'+info.activityPrice}</View>
          }
          <View className="price-num">{'￥'+info.retailPrice}</View>
        </View>
        <View className="recommend">
          <View className="recommend-title">推荐理由</View>
          <View className="recommend-con">
            {info.recommendReasons && info.recommendReasons.map((item,index) => (
              <View className="recommend-list">
                <View className="recommend-list-index">{index+1}</View>
                <View className="recommend-list-text">{item}</View>
              </View>
            ))}
          </View>
        </View>
      </View>
    )
  }
}
