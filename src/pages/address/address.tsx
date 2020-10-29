import React, { Component } from 'react'
import { View, Image, Input, Switch, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './address.less'
import more from '../../../static/images/more.png'
import AddPicker from './picker/picker'
import InputBox from '../../components/input/input'

export default class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      primary: false
    }
  }

  componentDidMount() {
    let addressDetail = Taro.getStorageSync('addressDetail')
    for(var i in addressDetail){
      this.setState({
        [i]: addressDetail[i]
      })
    }
  }

  getSelect(selectList) {
    this.setState({
      selectList: selectList,
      show: false
    })
  }

  onInput(data){
    let { name, value } = data
    this.setState({
      [name]: value
    })
  }

  getPicker(type) {
    this.setState({
      show: type
    })
  }

  switchChange(e) {
    this.setState({
      primary: e.detail.value
    })
  }

  getSure() {
    const { detail, selectList, id, primary } = this.state
    let address = ''
    let currentId = Taro.getStorageSync('currentId') || 0
    let addressList = Taro.getStorageSync('addressList') || []
    let primaryId = ''
    selectList.map(item => {
      address += item.name+' '
    })
    address += detail
    this.setState({
      address: address,
      id: id || currentId+1
    })
    Taro.setStorageSync('currentId',this.state.id)
    addressList.map((item,index) => {
      if(id && id == item.id){
        addressList.splice(index,1)
      }
      if(item.primary){
        primaryId = item.id
      }
      if(primary){
        item.primary = false
      }
    })
    var Index = primaryId == 0 ? 0 : 1
    addressList.splice(Index,0,this.state)
    Taro.setStorageSync('addressList',addressList)
    Taro.navigateBack()
    Taro.setStorageSync('addressDetail',{})
  }

  render() {
    const { show, selectList, user, phone, detail, primary } = this.state
    return(
      <View>
        <InputBox title="姓名" type="user" value={user} parent={this} require="1"/>
        <InputBox title="手机号" type="phone" value={phone} parent={this} require="1"/>
        <View class="reslist">
          <View class="reslist-title">
            <View class="require">*</View>
            地址
          </View>
          <View class="reslist-input input" onClick={() => this.getPicker(true)}>
            <View>{selectList ? selectList[0].name+'-'+selectList[1].name+'-'+selectList[2].name : '请选择'}</View>
            <Image class="reslist-input-more" src={more}></Image>
          </View>
        </View>
        <InputBox title="详细地址" type="detail" value={detail} parent={this} require="1"/>
        <View class="switch">
          <Switch checked={primary} onChange={e => this.switchChange(e)}></Switch>
          <View class="switch-text">设为默认</View>
        </View>
        <View class="padding">
          <Button type="primary" onClick={() => this.getSure()}>确定</Button>
        </View>
        {
          show &&
          <View>
            <View class="mask" onClick={() => this.getPicker(false)}></View>
            <AddPicker parent={this}/>
          </View>
        }
      </View>
    )
  }
}
