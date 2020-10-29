import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './footer.less'
const list = [{
  path: '/pages/home/home',
  icon: require('../../../static/images/home.png'),
  selectIcon: require('../../../static/images/home-active.png'),
  text: '首页'
},{
  path: '/pages/cate/cate',
  icon: require('../../../static/images/cate.png'),
  selectIcon: require('../../../static/images/cate-active.png'),
  text: '分类'
},{
  path: '/pages/cart/cart',
  icon: require('../../../static/images/cart.png'),
  selectIcon: require('../../../static/images/cart-active.png'),
  text: '购物车'
},{
  path: '/pages/my/my',
  icon: require('../../../static/images/user.png'),
  selectIcon: require('../../../static/images/user-active.png'),
  text: '我的'
}]

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  navTab(item) {
    Taro.reLaunch({
      url: item.path
    })
  }

  render() {
    const { navIndex, cartTotal } = this.props
    return(
      <View>
        <View class="box"></View>
        <View class="foot">
          {list.map((item,index) => (
            <View class="foot-list" onClick={() => this.navTab(item)}>
              <Image class="foot-list-icon" src={index == navIndex ? item.selectIcon.default : item.icon.default}></Image>
              <View class={`foot-list-text ${index == navIndex ? 'text1' : null}`}>{item.text}</View>
              <View class="foot-list-num">{cartTotal}</View>
            </View>
          ))}
        </View>
      </View>
    )
  }
}

export default Footer
