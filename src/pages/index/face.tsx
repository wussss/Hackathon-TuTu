import Taro, { memo } from '@tarojs/taro'
import React from 'react'
import { View } from '@tarojs/components'
import classnames from 'classnames'

const UNCHOOSED = '9999'

interface IFaceProps {
  item: any
  chooseID: string
  setChoose: (arg: string) => any
  onChoose: (arg: string) => any
}

const Face: Taro.FC<IFaceProps> = ({ item, chooseID, setChoose, onChoose }) => {
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
}

const MemoFace = Face

export default MemoFace
