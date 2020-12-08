import Taro from '@tarojs/taro'
import React, { useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import '../../res/iconfont/iconfont.scss'
import './index.scss'
const Index: Taro.FC = () => {
  const list = [
    {
      id: 1,
      src:
        'https://cdn.pixabay.com/photo/2016/03/23/04/01/beautiful-1274056_1280.jpg',
      text: '女团',
    },
    {
      id: 2,
      src:
        'https://cdn.pixabay.com/photo/2016/03/23/04/01/beautiful-1274056_1280.jpg',
      text: '裸妆',
    },
    {
      id: 3,
      src:
        'https://cdn.pixabay.com/photo/2016/03/23/04/01/beautiful-1274056_1280.jpg',
      text: '韩系',
    },
    {
      id: 4,
      src:
        'https://cdn.pixabay.com/photo/2016/03/23/04/01/beautiful-1274056_1280.jpg',
      text: '日系',
    },
    {
      id: 5,
      src:
        'https://cdn.pixabay.com/photo/2016/03/23/04/01/beautiful-1274056_1280.jpg',
      text: '艺术',
    },
    {
      id: 6,
      src:
        'https://cdn.pixabay.com/photo/2016/03/23/04/01/beautiful-1274056_1280.jpg',
      text: '泰妆',
    },
    {
      id: 7,
      src:
        'https://cdn.pixabay.com/photo/2016/03/23/04/01/beautiful-1274056_1280.jpg',
      text: '气质',
    },
    {
      id: 8,
      src:
        'https://cdn.pixabay.com/photo/2016/03/23/04/01/beautiful-1274056_1280.jpg',
      text: '欧美',
    },
  ]
  var [customMakeUp, setCustom] = useState('')
  var [makeupList, setList] = useState(list)
  const uploadMakeup = () => {
    let imgSrc = customMakeUp
    let list = makeupList
    wx.chooseImage({
      count: 1,
      sourceType: ['album', 'camera'],
      success: (res) => {
        console.log(res.tempFilePaths)
        imgSrc = res.tempFilePaths[0]
        list.unshift({
          id: 0,
          src: imgSrc,
          text: '自定义',
        })
        setCustom(imgSrc)
        setList(list)
      },
    })
  }
  const custom = 'https://i.ibb.co/c875vpH/image.png'
  const previewImage = () => {
    wx.previewImage({
      current:
        'https://cdn.pixabay.com/photo/2016/03/23/04/01/beautiful-1274056_1280.jpg', // 当前显示图片的http链接
      urls: [
        'https://cdn.pixabay.com/photo/2016/03/23/04/01/beautiful-1274056_1280.jpg',
      ], // 需要预览的图片http链接列表
    })
  }
  var [display, setDisplay] = useState('')
  const uploadImg = () => {
    wx.chooseImage({
      count: 1,
      sourceType: ['album', 'camera'],
      success: (res) => {
        setDisplay(res.tempFilePaths[0])
      },
    })
  }
  var example = display
    ? display
    : 'https://cdn.pixabay.com/photo/2016/03/23/04/01/beautiful-1274056_1280.jpg'
  return (
    <View className="index">
      <View className="logo" />
      <View className="display">
        <Image src={example} onClick={previewImage} />
      </View>
      <View onClick={uploadImg}>上传妆前照片</View>
      <View className="foot">
        <View className="custom" onClick={uploadMakeup}>
          <View
            className="make_up_item"
            style={{
              background: `url(${custom}) center no-repeat`,
              backgroundSize: 'cover',
            }}
          />
          <View className="text">上传妆面</View>
        </View>
        {makeupList.map((item) => {
          return (
            <View className="make_up">
              <View
                key={item.id}
                className="make_up_item"
                style={{
                  background: `url(${item.src}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
              />
              <View className="text">{item.text}</View>
            </View>
          )
        })}
      </View>
      <Text className="copyright">©2020 Continue. All rights reserved.</Text>
    </View>
  )
}
export default Index
