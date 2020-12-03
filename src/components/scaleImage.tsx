/* 根据两只手指相对距离的变化来对图片进行放大或缩小 */

import React, { Component } from 'react'
import { Image } from '@tarojs/components'

interface IProps {
  src: string
}
interface IState {
  scaleRate: number //比例
  isScale: boolean //是否放大缩小
  startX: number //移动开始位置
  startY: number
  distance: number //双指距离
}
export class Smage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      scaleRate: 1,
      isScale: false,
      startX: 0,
      startY: 0,
      distance: 0,
    }
  }
  touchStart = (e: any) => {
    if (e.touches.length === 1) {
      let { clientX, clientY } = e.touches[0]
      this.setState({
        startX: clientX,
        startY: clientY,
      })
      console.log('1')
    } else {
      let deltX = e.touches[1].clientX - e.touches[0].clientX
      let deltY = e.touches[1].clientY - e.touches[0].clientY
      let distance = Math.sqrt(deltX * deltX + deltY * deltY)
      this.setState({
        distance,
        isScale: true,
      })
      console.log('2', distance)
    }
  }
  touchMove = (e: any) => {
    if (e.touches.length === 1) {
      return
    } else {
      let deltaX = e.touches[1].clientX - e.touches[0].clientX
      let deltaY = e.touches[1].clientY - e.touches[0].clientY
      let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
      let distanceDiff = distance - this.state.distance
      let newScale = this.state.scaleRate + 0.005 * distanceDiff
      // 缩放比例设置
      if (newScale <= 2.5 && newScale >= 1) {
        this.setState({
          distance,
          scaleRate: newScale,
        })
      }
    }
  }
  touchEnd = (e: any) => {
    if (e.touches.length === 0) {
      console.log('0')
      this.setState({
        isScale: false,
      })
    }
  }
  render() {
    const { src } = this.props
    const { scaleRate } = this.state
    return (
      <Image
        src={src}
        style={{
          height: '350PX',
          width: '100%',
          transform: `scale(${scaleRate})`,
        }}
        onTouchStart={this.touchStart}
        onTouchMove={this.touchMove}
        onTouchEnd={this.touchEnd}
      />
    )
  }
}
