import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './list.less'
import ComPrice from '../../../components/price/price'
import Num from '../num/num'
import open from '../../../../static/images/open.png'
import icon from '../../../../static/images/edit.png'
import check from '../../../../static/images/check.png'

export default class CartList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartShow: false,
      pro: {},
      index: ''
    }
  }

  reset(item,index) {
    this.props.parent.reset({
      index,
      item
    })
  }

  change(index) {
    this.props.parent.change(index)
  }

  changeNum(data) {
    this.props.parent.changeNum(data)
  }

  render() {
    let { list } = this.props
    const { cartShow, pro } = this.state
    return(
      <View class="cartcon">
        {list && list.map((item,index) => (
          <View class="cartlist">
            {!item.check && <View class="cartlist-check" onClick={() => this.change(index)}></View>}
            {item.check && <Image class="cartlist-check check" src={check} onClick={() => this.change(index)}></Image>}
            <View class="cartlist-top">
              <Image class="cartlist-top-banner" src={item.item.picUrl}></Image>
              <View class="cartinfo">
                <View class="cartinfo-title" onClick={() => this.reset(item,index)}>
                  <View>{item.info.name}</View>
                  <Image class="cartinfo-title-icon" src={open}></Image>
                </View>
                <View class="catprice">
                  <ComPrice activityPrice={item.info.activityPrice} retailPrice={item.info.retailPrice}/>
                  <Num num={item.total} limitCount={item.freight.limitPurchaseCount} index={index} parent={this}/>
                </View>
                {
                  item.freight.limitedTag &&
                  <View class="cartser">
                    <Image class="cartser-icon" src={icon}></Image>
                    <View>{item.freight.limitedTag}</View>
                  </View>
                }
                {
                  item.freight.couponLimit &&
                  <View class="cartser">
                    <Image class="cartser-icon" src={icon}></Image>
                    <View>{item.freight.couponLimit}</View>
                  </View>
                }
              </View>
            </View>
          </View>
        ))}
      </View>
    )
  }
}
