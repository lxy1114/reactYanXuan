import React, { Component } from 'react'
import { View } from '@tarojs/components'
import './server.less'

export default class Server extends Component {
  constructor(props){
    super(props)
  }

  render() {
    const { list } = this.props
    return(
      <View class="serverCon">
        {list.map(item => (
          <View className="popupList">
            <View className="popupList-title">{item.title}</View>
            <View className="popupList-text">{item.content}</View>
          </View>
        ))}
      </View>
    )
  }
}
