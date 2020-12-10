import React, { Component } from 'react'
import { Provider } from 'react-redux'

import configStore from './store'
import './app.scss'

const store = configStore()

class App extends Component {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}
  static onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '图图美妆，真香',
      path: '/page/index/index',
    }
  }
  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <Provider store={store}>{this.props.children}</Provider>
  }
}

export default App
