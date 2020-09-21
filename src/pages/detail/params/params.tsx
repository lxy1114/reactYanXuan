import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import './params.less'

export default class Params extends Component {
  static defaultProps = {
    list: []
  }

  render() {
    const { list } = this.props
    return(
      <View className="content">
        {list.map(item => (
          <View className="list">
            <View className="list-title">{item.attrName}</View>
            <View className="list-text">{item.attrValue}</View>
          </View>
        ))}
      </View>
    )
  }
}
