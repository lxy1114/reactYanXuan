import React, { Component } from 'react'
import { View, Swiper, SwiperItem, Image } from '@tarojs/components'
import './centerBanner.less'

export default class CenterBanner extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    const { list } = this.props
    return(
      <View className="centerBanner">
        <Swiper
          autoplay
          indicatorDots>
          {list && list.map(item => (
            <SwiperItem>
              <Image className="centerBanner-img" src={item.picUrl}></Image>
            </SwiperItem>
          ))}
        </Swiper>
      </View>
    )
  }
}
