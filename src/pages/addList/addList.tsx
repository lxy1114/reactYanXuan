import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { toast } from '../../utils/util.js'
import './addList.less'
import location from '../../../static/images/location.png'
import nolist from '../../../static/images/nolist.png'

export default class AddList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: {},
      edit: false
    }
  }

  componentDidMount() {
    let list = Taro.getStorageSync('addressList') || []
    this.setState({
      list: list
    })
    this.getPrimary(list)
  }

  getPrimary(list) {
    let address = {}
    list.map(item => {
      if(item.primary){
        address = item
      }
    })
    this.setState({
      address: address
    })
  }

  getDelete = (e,index) => {
    e.stopPropagation()
    Taro.showModal({
      title: '提示',
      content: '确定删除？',
      success:(res) => {
        if(res.confirm){
          this.state.list.splice(index,1)
          this.setState({
            list: this.state.list
          })
          toast('删除成功')
          Taro.setStorageSync('addressList',this.state.list)
          this.getPrimary(this.state.list)
        }
      }
    })
  }

  selectAddress(e,item){
    e.stopPropagation()
    Taro.setStorageSync('selectAddress',item)
    Taro.reLaunch({
      url: '/pages/cart/cart'
    })
  }

  goAdd() {
    Taro.navigateTo({
      url: '/pages/address/address'
    })
  }

  goEdit(item) {
    Taro.setStorageSync('addressDetail',item)
    Taro.navigateTo({
      url: '/pages/address/address'
    })
  }

  gorefresh() {
    let addressList = Taro.getStorageSync('addressList')
    this.setState({
      list: addressList
    })
    this.getPrimary(addressList)
  }

  render() {
    const { address, list } = this.state
    let show = true
    return(
      <View>
        <View class="line"></View>
        <View class="add" onClick={() => this.gorefresh()}>刷新</View>
        <View class="line"></View>
        <View class="add" onClick={() => this.goAdd()}>+ 新增地址</View>
        {address.user && <View class="line"></View>}
        {address.user && <View class="current">
          <Image class="location" src={location}></Image>
          <View class="addlist">
            <View class="addlist-name">{address.user}</View>
            <View class="addlist-phone">{address.phone}</View>
            <View class="addlist-text">
              {address.primary && <View class="addlist-text-tag">默认</View>}
              {address.address}
            </View>
          </View>
        </View>}
        <View class="line"></View>
        {
          list && list[0] &&
          <View class="addcon">
            {list && list.map((item,index) => (
              <View class="addlist" onClick={() => this.goEdit(item)}>
                <View class="addlist-name">{item.user}</View>
                <View class="addlist-phone">{item.phone}</View>
                <View class="addlist-text">
                  {item.primary && <View class="addlist-text-tag">默认</View>}
                  {item.address}
                </View>
                <View class="addbtn">
                  <View class="delete">编辑</View>
                  <View class="delete" onClick={e =>this.getDelete(e,index)}>删除</View>
                  <View class="delete" onClick={e =>this.selectAddress(e,item)}>选择</View>
                </View>
              </View>
            ))}
          </View>
        }
        {
          show && list && list.length == 0 &&
          <View class="nolist">
            <Image class="nolist-img" src={nolist} mode="widthFix"></Image>
            <View class="nolist-text">暂无数据</View>
          </View>
        }
      </View>
    )
  }
}
