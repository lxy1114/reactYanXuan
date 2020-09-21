import React, { Component } from 'react'
import { View, Swiper, SwiperItem, Image, Text } from '@tarojs/components'
import './banner.less'

export default class DetailBanner extends Component {
  static defaultProps = {
    list: []
  }

  state = {
    current: 0
  }

  haldChange = (e) => {
    this.setState({
      current: e.detail.current
    })
  }

  render() {
    const { list } = this.props
    const { current } = this.state
    return (
      <View className="banner">
        <Swiper
          autoplay
          onChange={this.haldChange}>
          {list.map(item => (
            <SwiperItem>
              <Image className="banner-img" src={item}></Image>
            </SwiperItem>
          ))}
        </Swiper>
        <Text className="banner-current">{current+1+'/'+list.length}</Text>
      </View>
    )
  }
}
