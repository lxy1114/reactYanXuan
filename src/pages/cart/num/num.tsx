import React, { Component } from 'react'
import { View } from '@tarojs/components'
import './num.less'
import classNames from 'classNames'

export default class Num extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  changeNum(type) {
    let { num, limitCount, index } = this.props
    if(type == 'reduce'){
      num = num != 1 ? num-1 : num
    }else{
      num = num != limitCount ? num+1 : num
    }
    this.props.parent.changeNum({
      num,
      index
    })
  }

  render() {
    const { num, limitCount } = this.props
    return(
      <View class="cartNum">
        <View
				className={classNames('cartNum-btn',{
					'btn1': num == 1
				})}
				onClick={() => this.changeNum('reduce')}>
				-
			</View>
      <View class="cartNum-num">{num}</View>
      <View
				className={classNames('cartNum-btn',{
					'btn1': num == limitCount
				})}
				onClick={() => this.changeNum('add')}>
				+
			</View>
      </View>
    )
  }
}
