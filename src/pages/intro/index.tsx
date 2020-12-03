import Taro from '@tarojs/taro'
import React, { useEffect } from 'react'
import { View, Text } from '@tarojs/components'
import '../../res/iconfont/iconfont.scss'
import './index.scss'

let timer: NodeJS.Timeout
const footImg = 'https://i.loli.net/2020/12/03/TRBiPAvamN9WzI8.png'
const Intro: Taro.FC = () => {
  const toNextPage = () => {
    clearTimeout(timer)
    Taro.redirectTo({
      url: '../index/index',
    })
  }

  useEffect(() => {
    timer = setTimeout(toNextPage, 1000)
  }, [])

  return (
    <View className="intro">
      <View className="hello">这里是图图的产品介绍</View>
      <View className="iconfont icon-jinrufasong" onClick={toNextPage}>
        <Text>跳过</Text>
      </View>
      <View
        className="footImage"
        style={{
          background: `url(${footImg}) center no-repeat`,
          backgroundSize: 'cover',
        }}
      />
    </View>
  )
}
export default Intro
