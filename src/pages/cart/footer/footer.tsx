import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
import './footer.less'
import check from '../../../../static/images/check.png'
import { toast } from '../../../utils/util.js'

export default class CartFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  selectAll(type) {
    this.props.parent.selectAll(type)
  }

  goBuy() {
    const { total } = this.props
    if(!total){
      return toast('请选择商品')
    }
  }

  render() {
    const { all, total } = this.props
    return(
      <View class="cartfoot">
        <View class="cartfoot-all">
          {!all && <View class="cartfoot-all-check" onClick={() => this.selectAll(true)}></View>}
          {all && <Image class="cartfoot-all-check check" src={check} onClick={() => this.selectAll(false)}></Image>}
          <View>全选</View>
        </View>
        <View class="carttotal">
          <View class="carttotal-title">
            总计:
            <View class="carttotal-money">{total}</View>
          </View>
          <View class="carttotal-btn" onClick={() => this.goBuy()}>下单</View>
        </View>
      </View>
    )
  }
}
