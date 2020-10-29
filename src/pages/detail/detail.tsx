import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { getParams } from '../../utils/util.js'
import './detail.less'
import DetailBanner from './banner/banner'
import DetailInfo from './info/info'
import Params from './params/params'
import InfoDetail from './detail/detail'
import DetailFooter from './footer/footer'
import Deploy from './deploy/deploy'
import Select from './select/select'
import classNames from 'classNames'
import Server from './server/server'
import CenterBanner from './centerBanner/centerBanner'
import Footer from '../../components/footer/footer'

class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      info: {},
      bannerList: [],
      cartShow: false,
      value: '',
      total: 1,
      freight: {},
      serverList: [],
      serverShow: false,
      selectId: ''
    }
  }

  componentDidMount(e) {
    var params = getParams(this.props.tid)
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
          bannerList: [ info.listPicUrl, info.itemDetail.picUrl1, info.itemDetail.picUrl2, info.itemDetail.picUrl3, info.itemDetail.picUrl4 ]
        })
      }
    })
    if(Taro.getStorageSync('cartList')){
      this.setState({
        cartTotal: JSON.parse(Taro.getStorageSync('cartList')).length
      })
    }
  }

  getServer(show,type) {
    const { info, freight } = this.state
    this.setState({
      serverShow: show,
      serverList: type == 'server' ? info.policyList : freight.freight.policyList
    })
  }

  getCart(type) {
    this.setState({
      cartShow: type
    })
  }

  selectClassify(data) {
    this.setState({
      value: data.value,
      freight: data.freight,
      selectId: data.selectId,
      item: data.item
    })
  }

  totalChange(total) {
    this.setState({
      total: total
    })
  }

  addCart(cartTotal){
    this.setState({
      cartTotal: cartTotal
    })
  }

  render() {
    const { bannerList, info, cartShow, value, total, freight, serverShow, serverList, selectId, item, cartTotal } = this.state
    return(
      <View className={classNames('con',{
        'con1': cartShow
        })}>
        <DetailBanner list={bannerList}/>
        <DetailInfo info={info}/>
        <View className="line"></View>
        <Deploy info={info} value={value} total={total} freight={freight.freight} parent={this}/>
        <View className="line"></View>
        <CenterBanner list={info.adBanners}/>
        <View className="line"></View>
        <View className="page-title">商品参数</View>
        <Params list={info.attrList}/>
        {
          info.itemDetail &&
          <InfoDetail html={info.itemDetail.detailHtml}/>
        }
        <DetailFooter info={info} cartTotal={cartTotal} parent={this}/>
        <View className="popup">
          {
            cartShow && <View className="mask" onClick={() => this.getCart(false)}></View> ||
            serverShow && <View className="mask" onClick={() => this.getServer(false)}></View>
          }
          {cartShow && <Select info={info} selectId={selectId} item={item} parent={this} freight={freight} total={total} type="detail"/>}
          {serverShow && <Server list={serverList}></Server>}
        </View>
        <View class="none">
          <Footer cartTotal={cartTotal}/>
        </View>
      </View>
    )
  }
}

export default Detail
