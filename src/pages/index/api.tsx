// import { example_net } from '../../constants/myList'
import { baseUrl } from '../../config'

// import example from '../../res/images/example.jpeg'
import { IBefore } from '.'

interface IData {
  url: string
  status: number
}

// 生成妆图
export function genPhoto(id: string, before: IBefore): Promise<string> {
  const before1 = before.local_src ? before.local_src : before.src

  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: baseUrl + '/gen_photo',
      filePath: before1,
      name: 'photo',
      formData: {
        target_id: id || '0',
      },
      header: {
        'Content-Type': 'multipart/form-data',
        accept: 'application/json',
      },
      success: function (res) {
        try {
          const data: IData = JSON.parse(res.data)
          resolve(data.url)
        } catch (error) {
          reject(error)
        }
      },
      fail: function (res) {
        console.error(res)
        reject(res)
      },
    })
  })
}

// 上传妆面
export function uploadMakeup(): Promise<any> {
  const mid: string = Date.now() + '000' + ~~(Math.random() * 10000)
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      count: 1,
      sourceType: ['album', 'camera'],
      success: (res) => {
        const customMakeUp = res.tempFilePaths[0]
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
            try {
              const data: IData = JSON.parse(res.data)
              const newItem = {
                id: mid,
                src: data.url,
                text: '自定义',
                local_src: customMakeUp,
              }
              resolve(newItem)
            } catch (error) {
              reject(res)
            }
          },
          fail: function (res) {
            console.error(res)
            reject(res)
          },
        })
      },
      fail: function (res) {
        console.error(res)
        reject(res)
      },
    })
  })
}
