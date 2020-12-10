import Taro from '@tarojs/taro'
import React, { useState, useEffect } from 'react'
import { View, Text, Image, Button } from '@tarojs/components'
import { baseUrl } from '../../config'
import classnames from 'classnames'
import { myList } from '../../constants/myList'
import { Loading } from '../../components/Loading'
import example from '../../res/images/example.jpeg'
import '../../res/iconfont/iconfont.scss'
import './index.scss'
const custom = 'https://i.ibb.co/5sJSmPK/3.png'

interface IData {
  url: string
  status: number
}
const Index: Taro.FC = () => {
  const [chooseID, setChoose] = useState(1000)
  const [isFocus, setFocus] = useState(false)
  //将预设存在localStorage里
  // 当before变化时执行
  useEffect(() => {
    genPhoto(0)
  }, [before])
  //分享给好友
  var storageList = Taro.getStorageSync('makeuplist')
  var [makeupList, setList] = useState(storageList ? storageList : myList) //妆面列表
  var [before, setBefore] = useState(example) //妆前照片
  var [after, setAfter] = useState('') //妆后照片

  const uploadMakeup = () => {
    let customMakeUp = ''
    const mid: number = Date.now()
    wx.chooseImage({
      count: 1,
      sourceType: ['album', 'camera'],
      success: (res) => {
        customMakeUp = res.tempFilePaths[0]
        wx.uploadFile({
          url: baseUrl + '/up_photo',
          filePath: customMakeUp,
          name: 'photo',
          formData: {
            makeup_id: mid,
          },
          header: {
            'Content-Type': 'multipart/form-data',
            accept: 'application/json',
          },
          success: function (res) {
            const data: IData = JSON.parse(res.data)
            const newItem = {
              id: mid,
              src: data.url,
              text: '自定义',
            }
            const list = [newItem, ...makeupList]
            setList(list)
            Taro.setStorageSync('makeuplist', list)
          },
          fail: function (res) {
            console.error(res)
          },
        })
      },
    })
  }
  const genPhoto = (id: number) => {
    wx.uploadFile({
      url: baseUrl + '/gen_photo',
      filePath: before,
      name: 'photo',
      formData: {
        target_id: id || 0,
      },
      header: {
        'Content-Type': 'multipart/form-data',
        accept: 'application/json',
      },
      success: function (res) {
        const data: IData = JSON.parse(res.data)
        setAfter(data.url)
      },
      fail: function (res) {
        console.error(res)
      },
    })
  }
  const uploadImg = () => {
    wx.chooseImage({
      count: 1,
      sourceType: ['album', 'camera'],
      success: async (res) => {
        setBefore(res.tempFilePaths[0])
        setAfter('')
      },
    })
  }
  const previewImage = () => {
    wx.previewImage({
      current: after ? after : before, // 当前显示图片的http链接
      urls: [after ? after : before], // 需要预览的图片http链接列表
    })
  }
  return (
    <View className="index">
      <View className="logo" />
      <View className="display">
        <View
          className={classnames({
            image: true,
            after: after,
          })}
          style={{
            background: `url(${after ? after : before}) center no-repeat`,
            backgroundSize: 'cover',
          }}
          onClick={previewImage}
        />
      </View>
      <View className="foot">
        <View className="custom" onClick={uploadMakeup}>
          <View
            className="custom_item"
            style={{
              background: `url(${custom}) center no-repeat`,
              backgroundSize: 'cover',
            }}
          />
          <View className="text">上传妆面</View>
        </View>
        {makeupList.map((item) => {
          return (
            <View
              className={classnames({
                make_up: true,
                choose: item.id === chooseID,
              })}
              onClick={() => {
                genPhoto(item.id)
                setChoose(item.id)
                setFocus(!isFocus)
              }}
            >
              <View
                key={item.id}
                className={classnames({
                  null: true,
                  make_up_item: !!item.src,
                })}
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
      <View className="buttons">
        <Button className="upload" onClick={uploadImg} size="mini">
          上传照片
        </Button>
        <Button open-type="share" className="share" size="mini">
          分享给朋友
        </Button>
      </View>
      <Text className="copyright">©2020 Continue. All rights reserved.</Text>
    </View>
  )
}
export default Index
