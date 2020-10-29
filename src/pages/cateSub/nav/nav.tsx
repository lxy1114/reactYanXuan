import React, { Component } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classNames'
import './nav.less'

export default class CateSubNav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navIndex: 0
    }
  }

  navTab(index,item) {
    this.setState({
      navIndex: index
    })
    this.props.parent.navTab(item.id)
  }

  render() {
    const { list } = this.props
    const { navIndex } = this.state
    for(var i in list){
      if(list[i].id == 0){
        list.splice(i,1)
      }
    }
    return(
      <View class="subnav">
        {list && list.map((item,index) => (
          <View
            className={classNames('subnav-list',{
              'subnav-list1': index == navIndex
            })}
            onClick={() => this.navTab(index,item)}>
            {item.name}
          </View>
        ))}
      </View>
    )
  }
}
