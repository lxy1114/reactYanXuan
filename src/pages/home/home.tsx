import React, { Component } from 'react'
import { View, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './home.less'
import Banner from './banner/banner'
import Search from './search/search'
import Product from './product/product'
import Loading from '../../components/loading/loading'
import Footer from '../../components/footer/footer'
import { request } from '../../utils/request.js'
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      windowHeight: 0,
      recommendList: [],
      lastItem: {
        id: 0
      },
      bottom: false,
      loading: false,
      hasMore: false
    }
  }

  getRecommend(bottom) {
    if(bottom && !this.state.hasMore) return
    this.setState({
      bottom: bottom,
      loading: bottom
    })
    // Taro.request({
    //   url: 'https://miniapp.you.163.com/xhr/rcmd/index.json',
    //   method: 'GET',
    //   data: {
    //       lastItemId: 0 || this.state.lastItem && this.state.lastItem.id,
    //       size: 20
    //   },
    //   header: {
    //       'content-type': 'application/json' // 默认值
    //   },
    //   success:(res) => {
    //     if(res.data.code == 200){
    //       this.setState({
    //           recommendList: this.state.recommendList.concat(res.data.data.rcmdItemList),
    //           lastItem: res.data.data.rcmdItemList[res.data.data.rcmdItemList.length-1],
    //           loading: false,
    //           hasMore: res.data.data.hasMore
    //       })
    //     }
    //   }
    // })
    const data = await request('/xhr/rcmd/index.json',{
      lastItemId: 0 || this.state.lastItem && this.state.lastItem.id,
       size: 20
    })
    console.log(data)
  }

  componentDidMount() {
    this.setState({
      windowHeight: (Taro.getSystemInfoSync().windowHeight-50)+'px'
    })
    this.getRecommend()
  }
  render() {
    const { windowHeight, recommendList, loading, bottom } = this.state
    return (
      <View className="content">
        <Search />
        <ScrollView
          className="container"
          scrollY
          onScrollToLower={ () => this.getRecommend(true)}
          style={{height: windowHeight}}>
          <Banner />
          <View className="centerTitle">为你推荐</View>
          <Product list={recommendList}></Product>
          {
            bottom && <Loading loading={loading}></Loading>
          }
        </ScrollView>
        <Footer navIndex="0"/>
      </View>
    )
  }
}

export default Home
