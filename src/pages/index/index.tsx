import Taro from '@tarojs/taro'
import React, { Component, useState } from 'react'
import { View } from '@tarojs/components'
import classnames from 'classnames'
import './index.scss'

const Index: Taro.FC = () => {
  const [isUpdate, setUpdate] = useState(false)
  return (
    <View className="index">
      <View
        className={classnames({
          image_example: true,
          update: !!isUpdate,
        })}
      />
      <View
        onClick={() => {
          setUpdate(!isUpdate)
        }}
      >
        切换
      </View>
      <View className="logo" />
    </View>
  )
}
export default Index
