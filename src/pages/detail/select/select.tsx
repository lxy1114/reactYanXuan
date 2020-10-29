import React, { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { toast } from '../../../utils/util.js'
import './select.less'
import classNames from 'classNames'
import closeIcon from '../../../../static/images/close.png'
export default class Select extends Component {
  constructor(props) {
    super(props)
    this.state = {
      total: 1,
      banner: '',
      freight: ''
    }
  }

  selectClassify(item) {
    var freight = this.props.info.skuMap[item.id]
    this.setState({
      item,
      selectId: item.id,
      banner: item.picUrl,
      value: item.value,
      freight: freight
    })
    this.props.parent.selectClassify(this.state)
  }

  totalChange(type) {
    var { total, freight } = this.props
    if(type == 'reduce'){
      total = total > 1 ? total-1 : total
    }else{
      total = freight.limitPurchaseCount && total == freight.limitPurchaseCount ? total : total+1
    }
    this.props.parent.totalChange(total)
  }

  addCart() {
    if(!this.props.selectId) return toast('请选择规格')
	  var cartList = []
    const { info, item, freight } = this.props
    const { total } = this.props
	  if(Taro.getStorageSync('cartList')){
		  cartList = JSON.parse(Taro.getStorageSync('cartList'))
	  }
    for(var i in cartList){
      if(cartList[i].info.id == info.id && item && cartList[i].item.id == item.id){
        cartList.splice(i,1)
      }
    }
	  cartList.splice(0,0,{
		  info,
		  item,
      freight,
		  total,
      check: false
	  })
    var cartTotal = cartList && cartList.length
    this.props.parent.addCart(cartTotal)
	  Taro.setStorageSync('cartList',JSON.stringify(cartList))
    toast('加入购物车成功')
    this.props.parent.getCart(false)
  }

  getSure() {
    this.props.parent.getSure({
      item: this.props.item,
      freight: this.props.freight,
      total: this.props.total
    })
  }

  getClose() {
    this.props.parent.getCart(false)
  }

  render() {
    const { info, selectId, type, total, item, freight } = this.props
    let { banner } = this.state
    const limit = freight && freight.limitPurchaseCount
    return(
      <View className="select">
        <View class="fixed">
          <Image
            className="close"
            src={closeIcon}
            onClick={() => this.getClose()}>
          </Image>
          <View className="top">
            <Image className="top-banner" src={item && item.picUrl || banner || info.primaryPicUrl}></Image>
            <View className="top-info">
              <View className="top-info-money">
                {
                  info.activityPrice && <View className="money">{'￥'+info.activityPrice}</View>
                }
                <View className="money">{'￥'+info.retailPrice}</View>
              </View>
              <View className="top-info-text">请选择规格属性</View>
            </View>
          </View>
        </View>
        {info.skuSpecList && info.skuSpecList.map(item => (
          <View className="params">
            <View className="params-title">{item.name}</View>
            <View className="params-con">
              {item.skuSpecValueList.map(items => (
                <View
                  className={classNames('classify',{
                  'classify-select': selectId == items.id})}
                  onClick={() => this.selectClassify(items)}
                  >
                  {items.value}
                </View>
              ))}
            </View>
          </View>
        ))}
        <View className="num">
          <View className="num-title">数量</View>
          <View className="num-con">
            <View
              className={classNames('reduce',{
              'reduce1': total == 1})}
              onClick={() => this.totalChange('reduce')}
            >-</View>
            <View className="total">{total}</View>
            <View
              className={classNames('add',{
                'add1': freight && total == limit
              })}
              onClick={() => this.totalChange('add')}
            >+</View>
            {
              limit != 0 && limit != 'undefined' &&
              <View className="limitCount">{'限购'+limit+'件'}</View>
            }
          </View>
        </View>
        {
          type == 'detail' &&
          <View className="selectbut">
            <View className="selectbut-text" onClick={() => this.addCart()}>加入购物车</View>
            <View className="selectbut-text" onClick={() => this.buy()}>立即购买</View>
          </View>
        }
        {
          type == 'cart' &&
          <View class="select-sure" onClick={() =>this.getSure()}>确定</View>
        }
      </View>
    )
  }
}
