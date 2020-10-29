import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './cart.less'
import Footer from '../../components/footer/footer'
import edit from '../../../static/images/edit.png'
import CartList from './list/list'
import CartFooter from './footer/footer'
import Select from '../detail/select/select'
import nolist from '../../../static/images/nolist.png'
import { toast } from '../../utils/util.js'

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      all: false,
      total: 0,
      pro: {}
    }
  }

  componentDidMount() {
    if(Taro.getStorageSync('cartList')){
      this.setState({
        cartList: JSON.parse(Taro.getStorageSync('cartList'))
      })
    }
    let address = Taro.getStorageSync('selectAddress') || {}
    this.setState({
      address: address
    })
  }

  getCart(type) {
    this.setState({
      cartShow: type
    })
  }

  totalChange(total) {
    const { index, cartList } = this.state
    cartList[index].total = total
    this.state.pro.total = total
    this.setState({
      cartList: cartList,
      pro: this.state.pro
    })
  }

  reset(data) {
    this.setState({
      index: data.index,
      pro: data.item,
      cartShow: true
    })
  }

  selectClassify(data) {
    var pro = {
      item: data.item,
      freight: data.freight,
      info: this.state.cartList[this.state.index].info,
      total: this.state.cartList[this.state.index].total
    }
    this.setState({
      pro: pro
    })
  }

  getSure(data) {
    const { item, freight, total } = data
    const { index } = this.state
    this.state.cartList[index].item = data.item
    this.state.cartList[index].freight = data.freight
    if(freight.limitPurchaseCount && data.total > freight.limitPurchaseCount){
      this.state.cartList[index].total = freight.limitPurchaseCount
      toast('限购'+freight.limitPurchaseCount+'件')
    }else{
      this.state.cartList[index].total = data.total
    }
    this.setState({
      cartList: this.state.cartList,
      cartShow: false
    })
    Taro.setStorageSync('cartList',this.state.cartList)
    this.ifAll()
  }

  changeNum(data) {
    this.state.cartList[data.index].total = data.num
    this.setState({
      cartList: this.state.cartList,
      pro: this.state.cartList[data.index]
    })
    Taro.setStorageSync('cartList',this.state.cartList)
    this.ifAll()
  }

  change(index) {
    this.state.cartList[index].check = !this.state.cartList[index].check
    this.setState({
      cartList: this.state.cartList
    })
    this.ifAll()
  }

  ifAll() {
    var num = 0
    var total = 0
    const { cartList } = this.state
    cartList.map(item => {
      var price = item.info.activityPrice || item.info.retailPrice
      num = item.check ? num+1 : num
      if(item.check){
        total += item.total*price
      }
    })
    var all = num == this.state.cartList.length
    this.setState({
      all: all,
      total: total
    })
  }

  selectAll(type) {
    let { cartList } = this.state
    cartList.map(item => {
      item.check = type
    })
    this.setState({
      cartList: cartList
    })
    this.ifAll()
  }

  goAddress() {
    Taro.navigateTo({
      url: '/pages/addList/addList'
    })
  }

  render() {
    const { cartList, all, total, cartShow, pro, address } = this.state
    return(
      <View class="cart">
        <View class="carttop">
          <View class="carttop-title">
            <View class="carttop-title-text">配送地址</View>
            <Image class="carttop-title-edit" src={edit} onClick={() => this.goAddress()}></Image>
          </View>
          <View class="carttop-address">
            {address && address.user && <View class="carttop-address-name">{address.user}</View>}
            {address && address.phone && <View class="carttop-address-phone">{address.phone}</View>}
            {address && address.address && <View class="carttop-address-address">{address.address}</View>}
            {!address && <View>暂无配送地址</View>}
          </View>
        </View>
        {
          cartList &&
          <CartList list={cartList} parent={this}/>
        }
        {
          !cartList &&
          <View class="line"></View>
        }
        {
          !cartList &&
          <View class="nolist">
            <Image class="nolist-img" src={nolist} mode="widthFix"></Image>
            <View>暂无数据</View>
          </View>
        }
        {
          cartShow &&
          <View class="mask" onClick={() => this.getCart(false)}></View>
        }
        {
          cartShow &&
          <Select
            info={pro.info}
            selectId={pro.item.id}
            item={pro.item}
            parent={this}
            freight={pro.freight}
            total={pro.total}
            type="cart"
            limit={pro.freight.limitPurchaseCount}/>
        }
        <CartFooter all={all} total={total} parent={this}/>
        <Footer navIndex="2"/>
      </View>
    )
  }
}

export default Cart
