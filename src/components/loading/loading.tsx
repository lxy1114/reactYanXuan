import React, { Component } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './loading.less'

class Loading extends Component {
  static defaultProps = {
    loading: Boolean
  }

  render() {
    const { loading } = this.props
    return(
      <View>
        <View className="box"></View>
        {
          loading && <View className="loading">正在加载中...</View>
        }
      </View>
    )
  }
}

export default Loading
