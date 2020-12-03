import Taro from '@tarojs/taro'
import React, { useState } from 'react'
import { View,Text } from '@tarojs/components'
import classnames from 'classnames'
import { Smage } from '../../components/scaleImage'
import { Example } from '../../components/example'
import '../../res/iconfont/iconfont.scss'
import './index.scss'

const before =
  'https://cdn.pixabay.com/photo/2016/02/18/18/37/puppy-1207816_960_720.jpg'
const after = 'https://i.ibb.co/XyqHJMp/Wechat-IMG5.jpg'
const Index: Taro.FC = () => {
  const [isUpdate, setUpdate] = useState(false)
  return (
    <View className="index">
      <View className="logo" />
      <View className="image_example">
        <Smage src={isUpdate ? `${after}` : `${before}`} />
      </View>
      <View
        className="change iconfont icon-meiyan"
        onClick={() => {
          setUpdate(!isUpdate)
        }}
      />
      <View className="list">
        <Example text="动漫风照片示例" />
        <Example text="老照片修复示例" />
      </View>
      <View className="upload">点击生成专属动漫风照片</View>
     <Text>©2020 silan.wu, and qiyuan.tang. All rights reserved.</Text>
    </View>
  )
}
export default Index
