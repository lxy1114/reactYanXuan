import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './detail.less'
import DetailBanner from './banner/banner'
import DetailInfo from './info/info'
import Params from './params/params'
import infoDetail from './detail/detail'

class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      info: {},
      bannerList: []
    }
  }

  componentDidMount(e) {
    var params = React.$getParams(this.props.tid)
    this.itemId = params.id
    Taro.request({
      url: 'https://miniapp.you.163.com/xhr/item/detail.json',
      method: 'GET',
      data: {
        itemId: this.itemId
      },
      success:res => {
        var info = res.data.data
        this.setState({
          info: info,
          bannerList: [ info.listPicUrl, info.itemDetail.picUrl1, info.itemDetail.picUrl2, info.itemDetail.picUrl3, info.itemDetail.picUrl4]
        })
      }
    })
  }

  render() {
    const { bannerList, info } = this.state
    console.log(info.itemDetail,5555555)
    return(
      <View>
        <DetailBanner list={bannerList}/>
        <DetailInfo info={info}/>
        <View className="line"></View>
        <View className="page-title">商品参数</View>
        <Params list={info.attrList}/>
        <infoDetail />
      </View>
    )
  }
}

export default Detail
