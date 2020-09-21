import React, { Component } from 'react'
import { RichText } from '@tarojs/components'
import './detail.less'

export default class infoDetail extends Component {
  static DefaultProps = {
    html: ''
  }

  render() {
    const { html } = this.props
    return(
      <RichText nodes={html}></RichText>
    )
  }
}
