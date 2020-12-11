import Taro from '@tarojs/taro'
import React, { useEffect } from 'react'
import { View, Text } from '@tarojs/components'
import { Loading } from '../../components/Loading'
import { myList } from '../../constants/myList'
import '../../res/iconfont/iconfont.scss'
import './index.scss'
import example from '../../res/images/example.jpeg'

let timer: NodeJS.Timeout
const footImg = 'https://i.ibb.co/3RkCbFq/foot.png'
const Intro: Taro.FC = () => {
  const toNextPage = () => {
    clearTimeout(timer)
    Taro.redirectTo({
      url: '../index/index',
    })
  }

  useEffect(() => {
    // timer = setTimeout(toNextPage, 3000)
  }, [])
  return (
    <View className="intro">
      <View className="hello">图图美妆 &nbsp; 真香</View>
      <View className="loading">
        <Loading />
      </View>
      <View className="iconfont icon-jinrufasong" onClick={toNextPage}>
        <Text className="next">跳过</Text>
        {myList.map((item) => (
          <View
            key={item.id}
            style={{
              background: `url(${item.src}) center no-repeat`,
              backgroundSize: 'cover',
              width: '0',
              height: '0',
            }}
          >
            <View
              key={item.id}
              style={{
                background: `url(${example}) center no-repeat`,
                backgroundSize: 'cover',
                width: '0',
                height: '0',
              }}
            />
          </View>
        ))}
      </View>
      <View
        className="footImage"
        style={{
          background: `url(${footImg}) center no-repeat`,
          backgroundSize: 'cover',
        }}
      />
      <Text className="copyright">©2020 Continue. All rights reserved.</Text>
    </View>
  )
}
export default Intro
