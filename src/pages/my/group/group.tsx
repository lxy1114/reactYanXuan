import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
import './group.less'

export default class MyGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    const { list } = this.props
    return(
      <View>
        {list.map(item => (
          <View class="mylist">
            <Image class="mylist-icon" src={item.icon.default} mode="widthFix"></Image>
            <View class="mylist-text">{item.text}</View>
          </View>
        ))}
      </View>
    )
  }
}