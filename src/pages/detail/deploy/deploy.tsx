import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
import './deploy.less'
import moreIcon from '../../../../static/images/more.png'

export default class Deploy extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      sku: ''
    }
  }

  getCart() {
    this.props.parent.getCart(true)
  }
  
  getServer(type) {
    this.props.parent.getServer(true,type)
  }

  render() {
    const { info, value, total, freight } = this.props
    let { id, sku } = this.state
    sku = value && value+' '+'*'+total
    return(
      <View>
        {
          freight && <View 
            className="deploylist"
            onClick={()=> this.getServer('freight')}>
            <View className="deploylist-title">{freight.title}</View>
            <View className="deploylist-text">{freight.freightInfo}</View>
            <Image className="more" src={moreIcon}></Image>
          </View>
        }
        <View className="deploylist" onClick={()=> this.getCart()}>
          <View className="deploylist-title">规格</View>
          <View className="deploylist-text">{sku}</View>
          <Image className="more" src={moreIcon}></Image>
        </View>
        <View 
          className="deploylist"
          onClick={()=> this.getServer('server')}>
          <View className="deploylist-title">服务</View>
          <View className="server">
            {info.policyList && info.policyList.map(item => (
              <View className="serverList">
                <View className="serverList-round"></View>
                <View className="serverList-text">{item.title}</View>
              </View>
            ))}
          </View>
          <Image className="more" src={moreIcon}></Image>
        </View>
      </View>
    )
  }
}
