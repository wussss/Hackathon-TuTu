import Taro from '@tarojs/taro'
import React, { useState } from 'react'
import { View, Image } from '@tarojs/components'
import classnames from 'classnames'
import { Smage } from '../../components/scaleImage'
import '../../res/iconfont/iconfont.scss'
import './index.scss'

const before =
  'https://cdn.pixabay.com/photo/2020/04/11/19/47/clouds-over-the-mountains-5031782_960_720.jpg'
const after =
  'https://cdn.pixabay.com/photo/2020/08/12/07/09/landscape-5481816_960_720.jpg'
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
      ></View>
    </View>
  )
}
export default Index
