import React, { Component } from 'react'
import './app.less'
import 'taro-ui/dist/style/index.scss'
import getParams from './utils/util.js'

React.$getParams = getParams

class App extends Component {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return this.props.children
  }
}

export default App
