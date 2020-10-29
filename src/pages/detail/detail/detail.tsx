import React, { Component } from 'react'
import { View, RichText } from '@tarojs/components'
import './detail.less'

export default class InfoDetail extends Component {
  static DefaultProps = {
    html: ''
  }

  render() {
    let { html } = this.props
    html = html.replace(new RegExp('style=""','g'),'style="display:flex;width: 100%;"')
    return(
      <View className="box">
        <RichText nodes={html}></RichText>
      </View>
    )
  }
}
