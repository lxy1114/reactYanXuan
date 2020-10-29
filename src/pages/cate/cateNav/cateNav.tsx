import React, { Component } from 'react'
import { View } from '@tarojs/components'
import './cateNav.less'
import classNames from 'classNames'

export default class CateNav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Index: 0
    }
  }

  navTab(index) {
    this.setState({
      Index: index
    })
    this.props.parent.navTab(index)
  }

  render() {
    const { list } = this.props
    const { Index } = this.state
    return (
      <View className="cateNav">
        {list && list.map((item,index) => (
          <View className={classNames('',{
            'cateNav-list': index == Index
            })}
            onClick={() => this.navTab(index)}>
            {item.name}
          </View>
        ))}
      </View>
    )
  }
}
