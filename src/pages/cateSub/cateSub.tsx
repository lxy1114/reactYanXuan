import React, { Component } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { getParams } from '../../utils/util.js'
import './cateSub.less'
import CateSubNav from './nav/nav'
import CateItem from './cart/cart'

class CateSub extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      params: {}
    }
  }

  componentDidMount() {
    // if(Taro.getStorageSync('data')){
    //   return this.setState({
    //     data: Taro.getStorageSync('data')
    //   })
    // }
    this.state.params = getParams(this.props.tid)
    this.getData()
  }

  getData(id) {
    Taro.request({
      url: 'https://miniapp.you.163.com/xhr/list/l2Items2.json',
      method: 'GET',
      data: {
        categoryL1Id: 1005000,          //this.state.params.categoryId
        categoryL2Id: id || 109274000   //this.state.params.id
      },
      success:res => {
        this.setState({
          data: res.data.data
        })
        Taro.setStorageSync('data',this.state.data)
      }
    })
  }

  navTab(id) {
    this.getData(id)
  }

  render() {
    const { categoryL2List, itemList } = this.state.data
    return(
      <View>
        { categoryL2List && <CateSubNav list={categoryL2List} parent={this}/> }
        { itemList && <CateItem list={itemList} parent={this}/> }
      </View>
    )
  }
}
export default CateSub
