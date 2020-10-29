import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
import './picker.less'
import provinceList from '../../../utils/province.js'
import cityList from '../../../utils/city.js'
import countryList from '../../../utils/country.js'

export default class AddPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      province: '',
      city: '',
      country: '',
      selectList: []
    }
  }

  componentDidMount(){
    this.setState({
      list: provinceList,
      type: 1
    })
  }

  getSelect(item,name,mold) {
    let list = [], valueList = []
    let { type, selectList } = this.state
    if(selectList && selectList[mold]){
      selectList.splice(mold,1)
      selectList.splice(mold,0,item)
    }else{
      selectList.push(item)
    }
    switch(mold){
      case 0:
        valueList = provinceList;
        break;
      case 1:
        valueList = cityList;
        break;
      default:
        valueList = countryList;
    }
    type = type+1
    if(type != 0){
      valueList.map(items => {
        if(items.parent == item.value){
          list.push(items)
        }
      })
    }
    this.setState({
      list: list,
      type: type
    })
    if(type == 4){
      this.props.parent.getSelect(selectList)
    }
  }
  
  getPicker(type) {
    this.props.parent.getPicker(type)
  }

  render() {
    const { list, province, city, country, type, selectList } = this.state
    return(
      <View class="picker">
        <View class="picker-top">
          <View onClick={() => this.getPicker(false)}>取消</View>
        </View>
        <View class="picker-text">
          {selectList && selectList.map((item,index) => (
            <View onClick={() => this.getSelect(item,'title',index)}>{index == 0 ? item.name : '-'+item.name}</View>
          ))}
        </View>
        <View class="picker-list">
          {list && list.map(item => (
            <View class="picker-list-text" onClick={() => this.getSelect(item,'item',type)}>{item.name}</View>
          ))}
        </View>
      </View>
    )
  }
}
