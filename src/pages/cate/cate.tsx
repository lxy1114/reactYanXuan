import React, { Component } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './cate.less'
import CateNav from './cateNav/cateNav'
import Group from './group/group'
import Footer from '../../components/footer/footer'

class Cate extends Component {
  state = {

  }

  componentDidMount() {
    Taro.request({
      url: 'https://miniapp.you.163.com/xhr/list/category.json',
      method: 'GET',
      success:(res) => {
        this.setState({
          categoryList: res.data.data.categoryList,
          categoryGroupList: res.data.data.categoryList[0].categoryGroupList
        })
      }
    })
  }

  navTab(index) {
    this.setState({
      categoryGroupList: this.state.categoryList[index].categoryGroupList
    })
  }

  render() {
    let { categoryList, categoryGroupList } = this.state
    return(
      <View>
        <CateNav list={categoryList} parent={this}/>
        <Group list={categoryGroupList}/>
        <Footer navIndex="1"/>
      </View>
    )
  }
}

export default Cate
