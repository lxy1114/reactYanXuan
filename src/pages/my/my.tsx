import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
import './my.less'
import avatar from '../../../static/images/avatar.png'
import MyGroup from './group/group'
import Footer from '../../components/footer/footer'
const list = [
  {
    icon: require('../../../static/images/order.png'),
    text: '我的订单'
  },{
    icon: require('../../../static/images/pin.png'),
    text: '我的拼团'
  },{
    icon: require('../../../static/images/bargain.png'),
    text: '我的砍价'
  },{
    icon: require('../../../static/images/credit.png'),
    text: '我的积分'
  },{
    icon: require('../../../static/images/service.png'),
    text: '退换/售后'
  },{
    icon: require('../../../static/images/coupon.png'),
    text: '优惠券'
  },{
    icon: require('../../../static/images/red-packet.png'),
    text: '红包'
  },{
    icon: require('../../../static/images/allowance.png'),
    text: '津贴'
  },{
    icon: require('../../../static/images/gif-card.png'),
    text: '礼品卡'
  },{
    icon: require('../../../static/images/location.png'),
    text: '地址管理'
  },{
    icon: require('../../../static/images/safe.png'),
    text: '账号安全'
  },{
    icon: require('../../../static/images/contact.png'),
    text: '联系客服'
  },{
    icon: require('../../../static/images/feedback.png'),
    text: '用户反馈'
  },{
    icon: require('../../../static/images/help.png'),
    text: '帮助中心'
  }
]

class My extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  render() {
    return(
      <View>
        <View class="top">
          <Image class="top-avatar" src={avatar}></Image>
          <View class="top-info">
            <View class="top-info-title">未登录</View>
            <View class="top-info-text">点击登录账号</View>
          </View>
        </View>
        <MyGroup list={list}/>
        <Footer navIndex="3"/>
      </View>
    )
  }
}

export default My
