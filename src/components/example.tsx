import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import './example.scss'

interface IProps {
  text: string
}
export const Example: Taro.FC<IProps> = (props: IProps) => {
  return <View className="example">{props.text}</View>
}
