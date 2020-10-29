import React, { Component } from 'react'
import { View, Image, Input } from '@tarojs/components'
import './input.less'

export default class InputBox extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  onInput(e,name) {
    let value = e.detail.value
    this.props.parent.onInput({
      name,
      value
    })
  }

  render() {
    const { title, type, require, value } = this.props
    return(
      <View class="reslist">
        <View class="reslist-title">
          {require && <View class="require">*</View>}
          {title}
        </View>
        <Input class="reslist-input" value={value} placeholder={'请输入'+title} onInput={e => this.onInput(e,type)}></Input>
      </View>
    )
  }
}
