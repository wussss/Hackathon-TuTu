import React from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import './style.scss'

export const Loading: Taro.FC = () => {
  return (
    <View className="loading-anim">
      {/* <View className="border out" /> */}
      <View className="border in" />
      <View className="border mid" />
      {/* <View className="circle">
        <View className="dot" />
        <View className="dot" />
        <View className="dot" />
        <View className="dot" />
        <View className="dot" />
        <View className="dot" />
        <View className="dot" />
        <View className="dot" />
      </View> */}
    </View>
  )
}
