import Taro from '@tarojs/taro'
import React, { useState, useMemo, useCallback } from 'react'
import { View, Button } from '@tarojs/components'
import classnames from 'classnames'
import { example_net, myList } from '../../constants/myList'
// import { Loading } from '../../components/Loading'
import example from '../../res/images/example.jpeg'
import '../../res/iconfont/iconfont.scss'
import './index.scss'
import { genPhoto, uploadMakeup } from './api'
import MemoFace from './face'
const custom = 'https://i.ibb.co/5sJSmPK/3.png'

function getMakeupList() {
  return Taro.getStorageSync('makeuplist') || myList
}

export interface IBefore {
  src: string
  local_src: string
}

const UNCHOOSED = '9999'

const useForceUpdate = () => {
  const [, _forceUpdate] = useState(0)
  return useCallback(() => _forceUpdate((n) => n + 1), [])
}

const Index: Taro.FC = () => {
  console.log('render Index >>>>>>>>>')
  Taro.useShareAppMessage(() => {
    return {
      title: '图图美妆 真香',
    }
  })
  Taro.useShareTimeline(() => {
    return {
      title: '图图美妆 真香',
    }
  })

  const [isLoading, setLoading] = useState(false) //妆面id

  const [chooseID, setChoose] = useState(UNCHOOSED) //妆面id

  const [makeupList, setList] = useState(getMakeupList) //妆面列表
  const [before, setBefore] = useState<IBefore>({
    src: example_net,
    local_src: example,
  }) //妆前照片
  const [after, setAfter] = useState('') //妆后照片

  const isChoosed = useMemo(() => chooseID !== UNCHOOSED, [chooseID])

  const forceUpdate = useForceUpdate()

  // 上传本地照片
  const uploadImg = async () => {
    const info = Taro.getSystemInfoSync()
    console.log('getSystemInfoSync', info.platform, info)

    if (info.platform === 'android') {
      wx.chooseImage({
        count: 1,
        sourceType: ['album', 'camera'],
        success: async (res) => {
          const src = res.tempFilePaths[0]
          setBefore({ src, local_src: src })
          setChoose(UNCHOOSED)
          setAfter('')
          forceUpdate()
          // 预先请求
          genPhoto('0', { src, local_src: src })
        },
      })
      return
    }

    try {
      const { src, local_src } = await uploadMakeup()
      setBefore({ src, local_src })
      setChoose(UNCHOOSED)
      setAfter('')
      forceUpdate()
      // 预先请求
      genPhoto('0', { src, local_src })
    } catch (error) {}
  }

  // 选择妆面
  const onChoose = useCallback(
    async (id: string) => {
      setLoading(true)
      try {
        const url = await genPhoto(id, before)
        setAfter(url)
        setChoose(id)
        forceUpdate()
      } catch (error) {
        console.log(error)
        Taro.showToast({
          title: '生成失败...',
          icon: 'none',
          mask: false,
          duration: 2000,
        })
      } finally {
        setLoading(false)
      }
    },
    [before]
  )

  // 上传妆面
  const onUploadMakeup = async () => {
    try {
      const newItem = await uploadMakeup()
      // 预先请求
      genPhoto(newItem.mid, before)
      const list = [newItem, ...makeupList]
      setList(list)
      forceUpdate()
      Taro.setStorageSync('makeuplist', list)
    } catch (error) {
      console.log(error)
      Taro.showToast({
        title: '上传失败...',
        icon: 'none',
        mask: false,
        duration: 2000,
      })
    }
  }

  const previewImage = () => {
    Taro.previewImage({
      current: isChoosed ? after : before.src, // 当前显示图片的http链接
      urls: [isChoosed ? after : before.src], // 需要预览的图片http链接列表
    })
  }

  return (
    <View className="index">
      {isLoading && <View className="loading-text">AI 生成中...</View>}
      <View className="logo" />
      <View className="display">
        <View
          className={classnames({
            image: true,
            after: after,
          })}
          style={{
            background: `url(${
              isChoosed ? after : before.src
            }) center no-repeat`,
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
        {makeupList.map((item) => (
          <MemoFace
            key={item.id}
            item={item}
            chooseID={chooseID}
            setChoose={setChoose}
            onChoose={onChoose}
          />
        ))}
      </View>
      <View className="buttons">
        <Button className="upload" onClick={uploadImg} size="mini">
          上传照片
        </Button>
        <Button open-type="share" className="share" size="mini">
          分享给朋友
        </Button>
      </View>
    </View>
  )
}
export default Index
