import React, { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import './footer.less'
import indexIocn from '../../../../static/images/home.png'
import cartIocn from '../../../../static/images/cart.png'
import Select from '../select/select'

export default class DetailFooter extends Component {
  static defaultProps = {
    info: {}
  }

  state = {
    cartShow: false
  }

  getCart(type) {
    this.props.parent.getCart(type)
  }

  render() {
    const { info, cartTotal } = this.props
    let { cartShow } = this.state
    return(
      <View>
        <View className="footer">
          <View className="footer-icon">
            <Image src={indexIocn}></Image>
          </View>
          <View className="footer-icon">
            <Image src={cartIocn}></Image>
            {cartTotal && <View className="footer-icon-total">{cartTotal}</View>}
          </View>
          <View 
            className="footer-but"
            onClick={()=> this.getCart(true)}>
            立即购买
          </View>
          <View
            className="footer-but"
            onClick={()=> this.getCart(true)}>
            加入购物车
          </View>
        </View>
      </View>
    )
  }
}
