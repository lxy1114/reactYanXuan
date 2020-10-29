import React, { Component } from 'react'
import { View } from '@tarojs/components'
import './price.less'

export default class ComPrice extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const { activityPrice, retailPrice } = this.props
    return(
      <View className="price">
        {
          activityPrice &&
          <View className="price-detail">￥{activityPrice}</View>
        }
        {
          retailPrice &&
          <View className="price-detail">￥{retailPrice}</View>
        }
      </View>
    )
  }
}
