import Taro from '@tarojs/taro'
import React, { useState, useEffect, useMemo } from 'react'
import { View, Text, Image, Button } from '@tarojs/components'
import { baseUrl } from '../../config'
import classnames from 'classnames'
import { myList } from '../../constants/myList'
import { Loading } from '../../components/Loading'
import example from '../../res/images/example.jpeg'
import '../../res/iconfont/iconfont.scss'
import './index.scss'
import { genPhoto, uploadMakeup } from './api'
const custom = 'https://i.ibb.co/5sJSmPK/3.png'

function getMakeupList() {
  console.log('render getMakeupList >>>>>>>>>')
  return Taro.getStorageSync('makeuplist') || myList
}

const UNCHOOSED = '9999'

const Index: Taro.FC = () => {
  console.log('render Index >>>>>>>>>')

  const [chooseID, setChoose] = useState(UNCHOOSED) //妆面id

  //分享给好友
  // const storageList = Taro.getStorageSync('makeuplist')
  const [makeupList, setList] = useState(getMakeupList) //妆面列表
  const [before, setBefore] = useState(example) //妆前照片
  const [after, setAfter] = useState('') //妆后照片

  const isChoosed = useMemo(() => chooseID !== UNCHOOSED, [chooseID])

  // 上传本地照片
  const uploadImg = () => {
    wx.chooseImage({
      count: 1,
      sourceType: ['album', 'camera'],
      success: async (res) => {
        setBefore(res.tempFilePaths[0])
        setChoose(UNCHOOSED)
        setAfter('')
        // 预先请求
        genPhoto('0', before)
      },
    })
  }

  // 选择妆面
  const onChoose = async (id: string) => {
    const url = await genPhoto(id, before)
    setAfter(url)
    setChoose(id)
  }

  // 上传妆面
  const onUploadMakeup = async () => {
    const newItem = await uploadMakeup()
    // 预先请求
    genPhoto(newItem.mid, before)
    const list = [newItem, ...makeupList]
    setList(list)
    Taro.setStorageSync('makeuplist', list)
  }

  const previewImage = () => {
    wx.previewImage({
      current: isChoosed ? after : before, // 当前显示图片的http链接
      urls: [isChoosed ? after : before], // 需要预览的图片http链接列表
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
            background: `url(${isChoosed ? after : before}) center no-repeat`,
            backgroundSize: 'cover',
          }}
          onClick={previewImage}
        />
      </View>
      <View className="foot">
        <View className="custom" onClick={onUploadMakeup}>
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
              key={item.id}
              className={classnames({
                make_up: true,
                choose: String(item.id) === String(chooseID),
              })}
              onClick={() => {
                if (String(item.id) === String(chooseID)) {
                  setChoose(UNCHOOSED)
                  return
                }

                onChoose(item.id)
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
